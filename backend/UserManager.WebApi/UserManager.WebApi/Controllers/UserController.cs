using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManager.WebApi.Interfaces.Services;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserLoginService _userLoginService;

        public UserController
        (
            IUserService userService,
            IUserLoginService userLoginService
        )
        {
            _userService = userService;
            _userLoginService = userLoginService;
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

        [HttpPost]
        [Route("api/user")]
        public async Task<IActionResult> CreateUser(UserDTO user)
        {
            try
            {
                await _userService.CreateNewUserAsync(user);

                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("api/user/validate")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateUser(UserDTO user)
        {
            try
            {
                var authResponse = await _userLoginService.ValidateUserAsync(user.Email, user.Password);

                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("api/users/logins/paginated")]
        public async Task<IActionResult> GetPaginatedLogins(int paginationNumber, int countNumber)
        {
            try
            {
                var logins = await _userLoginService.GetPaginatedUserLoginAttemptsAsync(paginationNumber, countNumber);

                return Ok(logins);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
