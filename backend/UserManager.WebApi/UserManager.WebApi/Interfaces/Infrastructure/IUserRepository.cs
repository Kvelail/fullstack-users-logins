using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Infrastructure
{
    public interface IUserRepository
    {
        Task<UsersWrapperDTO> GetFilteredUsersAsync(int firstNRecordsToSkip, int nextNRecordsToTake);
        Task<UserDTO?> GetUserByEmailAsync(string email);
        Task<bool> CreateNewUserAsync(UserDTO user);
    }
}
