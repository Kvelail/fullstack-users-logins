using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Helpers;
using UserManager.WebApi.Infrastructure.Models;
using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<UserDTO>> GetAllUsersAsync()
        {
            var dbUsers = _context.Users;

            return await
                dbUsers
                    .Select(u => new UserDTO
                    {
                        Username = u.Username,
                        Password = u.Password,
                        Email = u.Email,
                        RegisteredDate = u.RegisteredDate,
                    })
                    .ToListAsync();
        }

        public async Task<List<UserDTO>> GetFilteredUsersAsync(int firstNRecordsToSkip, int nextNRecordsToTake)
        {
            var dbUsers =
                _context.Users
                    .Skip(1)
                    .Skip(firstNRecordsToSkip)
                    .Take(nextNRecordsToTake);

            return await
                dbUsers
                    .Select(u => new UserDTO
                    {
                        Username = u.Username,
                        Password = u.Password,
                        Email = u.Email,
                        RegisteredDate = u.RegisteredDate,
                    })
                    .ToListAsync();
        }

        public async Task<UserDTO?> GetUserByEmailAsync(string email)
        {
            var dbUser = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (dbUser == null)
                return null;

            return new UserDTO
            {
                Id = dbUser.UserId,
                Username = dbUser.Username,
                Password = dbUser.Password,
                Email = dbUser.Email,
                RegisteredDate = dbUser.RegisteredDate
            };
        }

        public async Task<bool> CreateNewUserAsync(UserDTO user)
        {
            var dbUser = _context.Users.SingleOrDefault(u => u.Username == user.Username || u.Email == user.Email);

            if (dbUser != null)
                return false;

            dbUser = new User();

            dbUser.Username = user.Username;
            dbUser.Password = EncryptionHelper.EncryptBase64(user.Password);
            dbUser.Email = user.Email;
            dbUser.RegisteredDate = DateTime.UtcNow;

            await _context.Users.AddAsync(dbUser);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
