namespace UserManager.WebApi.Interfaces.Infrastructure
{
    public interface IUserRepository
    {
        Task<List<WebApi.Models.Dtos.UserDTO>> GetAllUsersAsync();
        Task<List<WebApi.Models.Dtos.UserDTO>> GetFilteredUsersAsync(int firstNRecordsToSkip, int nextNRecordsToTake);
        Task<WebApi.Models.Dtos.UserDTO?> GetUserByEmailAsync(string email);
        Task<bool> CreateNewUserAsync(WebApi.Models.Dtos.UserDTO user);
    }
}
