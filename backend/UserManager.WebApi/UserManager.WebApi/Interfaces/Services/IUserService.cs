namespace UserManager.WebApi.Interfaces.Services
{
    public interface IUserService
    {
        Task<List<Models.Dtos.UserDTO>> GetAllUsersAsync();
        Task<List<Models.Dtos.UserDTO>> GetPaginatedUsersAsync(int paginationNumber, int countNumber);
        Task CreateNewUserAsync(Models.Dtos.UserDTO user);
    }
}
