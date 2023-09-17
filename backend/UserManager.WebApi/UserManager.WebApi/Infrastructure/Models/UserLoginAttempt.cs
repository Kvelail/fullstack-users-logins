using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManager.WebApi.Infrastructure.Models
{
    public class UserLoginAttempt
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int UserId { get; set; }

        [Required]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int LoginAttemptTypeId { get; set; }

        [Required]
        [Column(Order = 2)]
        public DateTime IssuedDate { get; set; }

        public User User { get; set; }
        public LoginAttemptType LoginAttemptType { get; set; }
    }
}
