namespace UserManager.WebApi.Models.Dtos
{
    public class UsersWrapperDTO
    {
        public List<UserDTO> Users { get; set; }
        public int UsersCount { get; set; }
    }
}
