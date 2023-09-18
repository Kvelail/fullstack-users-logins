using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Infrastructure.Models;
using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Infrastructure.Repositories
{
    public class UserLoginRepository : IUserLoginRepository
    {
        private readonly UserContext _context;

        public UserLoginRepository(UserContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<LoginsWrapperDTO> GetFilteredLoginsAsync(int firstNRecordsToSkip, int nextNRecordsToTake)
        {
            var dbUserLoginAttemps =
                _context.UserLoginAttempts
                .Include(ula => ula.User);

            var filteredDbUserLoginAttemps = dbUserLoginAttemps
                    .Skip(firstNRecordsToSkip)
                    .Take(nextNRecordsToTake);

            var filteredUserLoginAttemps = await filteredDbUserLoginAttemps.Select(ula => new UserLoginAttemptDTO
            {
                User = new UserDTO
                {
                    Username = ula.User.Username,
                    Email = ula.User.Email,
                    RegisteredDate = ula.User.RegisteredDate
                },
                LoginAttemptType = new LoginAttemptTypeDTO
                {
                    Code = ula.LoginAttemptType.Code,
                    Description = ula.LoginAttemptType.Description
                },
                IssuedDate = ula.IssuedDate
            }).ToListAsync();

            int loginsCount = dbUserLoginAttemps.Count();

            return new LoginsWrapperDTO
            {
                Logins = filteredUserLoginAttemps,
                LoginsCount = loginsCount
            };

        }
        public async Task InsertUserLoginAttempt(UserLoginAttemptDTO userLoginAttempt)
        {
            await _context.AddAsync(new UserLoginAttempt
            {
                UserId = (int)userLoginAttempt.User.Id,
                LoginAttemptTypeId = userLoginAttempt.LoginAttemptType.Id,
                IssuedDate = userLoginAttempt.IssuedDate
            });

            await _context.SaveChangesAsync();
        }
    }
}
