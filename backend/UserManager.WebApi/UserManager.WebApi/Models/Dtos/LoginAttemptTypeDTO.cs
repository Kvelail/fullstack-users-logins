namespace UserManager.WebApi.Models.Dtos
{
    public class LoginAttemptTypeDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string? Description { get; set; }
    }
}
