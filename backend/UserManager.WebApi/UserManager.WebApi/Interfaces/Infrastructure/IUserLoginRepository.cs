using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Interfaces.Infrastructure
{
    public interface IUserLoginRepository
    {
        Task<LoginsWrapperDTO> GetFilteredLoginsAsync(int firstNRecordsToSkip, int nextNRecordsToTake);
        Task InsertUserLoginAttempt(UserLoginAttemptDTO userLoginAttempt);
    }
}
