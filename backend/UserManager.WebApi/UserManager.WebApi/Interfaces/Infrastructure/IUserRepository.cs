namespace UserManager.WebApi.Interfaces.Infrastructure
{
    public interface IUserRepository
    {
        Task<List<WebApi.Models.Dtos.UserDTO>> GetAllUsersAsync();
        Task<List<WebApi.Models.Dtos.UserDTO>> GetFilteredUsersAsync(int firstNRecordsToSkip, int nextNRecordsToTake);
    }
}
