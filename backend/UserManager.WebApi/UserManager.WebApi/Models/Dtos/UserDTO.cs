using System.Text.Json.Serialization;

namespace UserManager.WebApi.Models.Dtos
{
    public class UserDTO
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? Id { get; set; }
        public string? Username { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Password { get; set; }
        public string? Email { get; set; }
        public DateTime? RegisteredDate { get; set; }
    }
}
