using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Infrastructure
{
    public interface IUserLoginRepository
    {
        Task<List<UserLoginAttemptDTO>> GetAllUserLoginAttemptsAsync();
        Task InsertUserLoginAttempt(UserLoginAttemptDTO userLoginAttempt);
    }
}
