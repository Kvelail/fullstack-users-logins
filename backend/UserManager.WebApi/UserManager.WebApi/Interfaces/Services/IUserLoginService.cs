using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Services
{
    public interface IUserLoginService
    {
        Task<List<UserLoginAttemptDTO>> GetAllUserLoginAttemptsAsync();
        Task<WebApi.Models.Dtos.UserDTO> ValidateUserAsync(string email, string password);
    }
}
