namespace UserManager.WebApi.Interfaces.Services
{
    public interface IUserService
    {
        Task<List<WebApi.Models.Dtos.UserDTO>> GetAllUsersAsync();
        Task<List<WebApi.Models.Dtos.UserDTO>> GetPaginatedUsersAsync(int paginationNumber, int countNumber);
        Task CreateNewUserAsync(WebApi.Models.Dtos.UserDTO user);
    }
}
