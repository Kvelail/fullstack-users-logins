using UserManager.WebApi.Models;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Services
{
    public interface IUserLoginService
    {
        Task<LoginsWrapperDTO> GetPaginatedUserLoginAttemptsAsync(int paginationNumber, int countNumber);
        Task<AuthResponse> ValidateUserAsync(string email, string password);
    }
}
