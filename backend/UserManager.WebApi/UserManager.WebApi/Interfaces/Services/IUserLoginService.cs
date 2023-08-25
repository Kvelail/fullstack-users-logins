using UserManager.WebApi.Models;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Services
{
    public interface IUserLoginService
    {
        Task<List<UserLoginAttemptDTO>> GetAllUserLoginAttemptsAsync();
        Task<AuthResponse> ValidateUserAsync(string email, string password);
    }
}
