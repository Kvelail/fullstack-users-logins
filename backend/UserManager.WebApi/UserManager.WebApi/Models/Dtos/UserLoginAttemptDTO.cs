namespace UserManager.WebApi.Models.Dtos
{
    public class UserLoginAttemptDTO
    {
        public UserDTO User { get; set; }
        public LoginAttemptTypeDTO LoginAttemptType { get; set; }
        public DateTime IssuedDate { get; set; }
    }
}
