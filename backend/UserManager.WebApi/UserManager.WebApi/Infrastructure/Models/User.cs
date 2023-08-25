using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UserManager.WebApi.Infrastructure.Models
{
    public class User
    {
        [Key]
        [Required]
        [Column(Order = 0)]
        public int UserId { get; set; }

        [Required]
        [Column(Order = 1)]
        public string Username { get; set; }

        [Required]
        [Column(Order = 2)]
        public string Password { get; set; }

        [Required]
        [Column(Order = 3)]
        public string Email { get; set; }

        [Required]
        [Column(Order = 4)]
        public DateTime RegisteredDate { get; set; }
    }
}
