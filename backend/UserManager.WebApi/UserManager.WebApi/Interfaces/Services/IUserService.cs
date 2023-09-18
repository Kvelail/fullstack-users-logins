using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Services
{
    public interface IUserService
    {
        Task<UsersWrapperDTO> GetPaginatedUsersAsync(int paginationNumber, int countNumber);
        Task CreateNewUserAsync(UserDTO user);
    }
}
