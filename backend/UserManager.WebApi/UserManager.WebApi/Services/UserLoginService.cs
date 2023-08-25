using System.Security.Authentication;
using UserManager.WebApi.Helpers;
using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Interfaces.Services;
using UserManager.WebApi.Models;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Services
{
    public class UserLoginService : IUserLoginService
    {
        private readonly IUserLoginRepository _userLoginRepository;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserLoginService
        (
           IUserLoginRepository userLoginRepository,
           IUserRepository userRepository,
           IConfiguration configuration
        )
        {
            _userLoginRepository = userLoginRepository;
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<List<UserLoginAttemptDTO>> GetAllUserLoginAttemptsAsync()
        {
            return await _userLoginRepository.GetAllUserLoginAttemptsAsync();
        }

        public async Task<AuthResponse> ValidateUserAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
                throw new KeyNotFoundException("User does not exist");

            var decodedPassword = EncryptionHelper.DecryptBase64(user.Password);

            var userLoginAttempt = new UserLoginAttemptDTO
            {
                User = new UserDTO
                {
                    Id = user.Id
                },
                LoginAttemptType = new LoginAttemptTypeDTO(),
                IssuedDate = DateTime.UtcNow
            };

            if (password != decodedPassword)
            {
                userLoginAttempt.LoginAttemptType.Id = 2;
                await _userLoginRepository.InsertUserLoginAttempt(userLoginAttempt);

                throw new AuthenticationException("Password is not valid");
            }

            userLoginAttempt.LoginAttemptType.Id = 1;
            await _userLoginRepository.InsertUserLoginAttempt(userLoginAttempt);

            string authIssuer = _configuration["Authentication:Issuer"];
            string authKey = _configuration["Authentication:Key"];
            int authExpiresAfterHours = Int32.Parse(_configuration["Authentication:ExpiresAfterHours"]);

            string accessToken = AuthenticationHelper.GenerateJSONWebToken(authIssuer, authKey, authExpiresAfterHours);

            var authResponse = new AuthResponse
            {
                AccessToken = accessToken
            };

            return authResponse;
        }
    }
}
