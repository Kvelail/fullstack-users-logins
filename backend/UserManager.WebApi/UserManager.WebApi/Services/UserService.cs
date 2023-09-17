using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Interfaces.Services;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<UserDTO>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<List<UserDTO>> GetPaginatedUsersAsync(int paginationNumber, int countNumber)
        {
            int nextNRecordsToTake = countNumber;
            int firstNRecordsToSkip = (paginationNumber * countNumber) - countNumber;

            return await _userRepository.GetFilteredUsersAsync(firstNRecordsToSkip, nextNRecordsToTake);
        }

        public async Task CreateNewUserAsync(UserDTO user)
        {
            if (!await _userRepository.CreateNewUserAsync(user))
                throw new ArgumentException("User with provided username already exists");
        }
    }
}
