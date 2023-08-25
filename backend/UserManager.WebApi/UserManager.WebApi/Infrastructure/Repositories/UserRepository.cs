using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Interfaces.Infrastructure;

namespace UserManager.WebApi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<WebApi.Models.Dtos.UserDTO>> GetAllUsersAsync()
        {
            var dbUsers = _context.Users;

            return await
                dbUsers
                    .Select(u => new WebApi.Models.Dtos.UserDTO
                    {
                        Username = u.Username,
                        Password = u.Password,
                        Email = u.Email,
                        RegisteredDate = u.RegisteredDate,
                    })
                    .ToListAsync();
        }

        public async Task<List<WebApi.Models.Dtos.UserDTO>> GetFilteredUsersAsync(int firstNRecordsToSkip, int nextNRecordsToTake)
        {
            var dbUsers =
                _context.Users
                    .Skip(firstNRecordsToSkip)
                    .Take(nextNRecordsToTake);

            return await
                dbUsers
                    .Select(u => new WebApi.Models.Dtos.UserDTO
                    {
                        Username = u.Username,
                        Password = u.Password,
                        Email = u.Email,
                        RegisteredDate = u.RegisteredDate,
                    })
                    .ToListAsync();
        }
    }
}
