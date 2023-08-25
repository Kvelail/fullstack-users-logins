using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManager.WebApi.Interfaces.Services;
using UserManager.WebApi.Models.Dtos;

namespace UserManager.WebApi.Controllers
{
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
        public async Task<IActionResult> ValidateUser(UserDTO user)
        {
            try
            {
                var validatedUser = await _userLoginService.ValidateUserAsync(user.Email, user.Password);

                return Ok(validatedUser);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("api/users/logins")]
        public async Task<IActionResult> GetUsersLoginAttempts()
        {
            try
            {
                var usersLoginAttemps = await _userLoginService.GetAllUserLoginAttemptsAsync();

                return Ok(usersLoginAttemps);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
