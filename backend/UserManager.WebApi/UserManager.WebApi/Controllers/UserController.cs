using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManager.WebApi.Interfaces.Services;

namespace UserManager.WebApi.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController
        (
            IUserService userService
        )
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("api/users/paginated")]
        public async Task<IActionResult> GetPaginatedUsers(int paginationNumber, int countNumber)
        {
            try
            {
                var users = await _userService.GetPaginatedUsersAsync(paginationNumber, countNumber);

                return Ok(users);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
