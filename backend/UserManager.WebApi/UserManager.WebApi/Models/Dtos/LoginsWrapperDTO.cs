namespace UserManager.WebApi.Models.Dtos
{
    public class LoginsWrapperDTO
    {
        public List<UserLoginAttemptDTO> Logins { get; set; }
        public int LoginsCount { get; set; }
    }
}
