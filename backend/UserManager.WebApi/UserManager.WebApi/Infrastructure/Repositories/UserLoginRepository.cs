using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Infrastructure.Models;
using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Infrastructure.Repositories
{
    public class UserLoginRepository : IUserLoginRepository
    {
        private readonly UserContext _context;

        public UserLoginRepository(UserContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<UserLoginAttemptDTO>> GetAllUserLoginAttemptsAsync()
        {
            var dbUserLoginAttemps =
                _context.UserLoginAttempts
                .Include(ula => ula.User);

            return await dbUserLoginAttemps.Select(ula => new UserLoginAttemptDTO
            {
                User = new UserDTO
                {
                    Username = ula.User.Username,
                    Password = ula.User.Password,
                    Email = ula.User.Email,
                    RegisteredDate = ula.User.RegisteredDate
                },
                LoginAttemptType = new LoginAttemptTypeDTO
                {
                    Code = ula.LoginAttemptType.Code,
                    Description = ula.LoginAttemptType.Description
                },
                IssuedDate = ula.IssuedDate
            }).ToListAsync();
        }

        public async Task InsertUserLoginAttempt(UserLoginAttemptDTO userLoginAttempt)
        {
            await _context.AddAsync(new UserLoginAttempt
            {
                UserId = (int)userLoginAttempt.User.Id,
                LoginAttemptTypeId = userLoginAttempt.LoginAttemptType.Id,
                IssuedDate = userLoginAttempt.IssuedDate
            });

            await _context.SaveChangesAsync();
        }
    }
}
