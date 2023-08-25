using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UserManager.WebApi.Infrastructure.Models
{
    public class LoginAttemptType
    {
        [Required]
        [Column(name: "ID", Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int LoginAttemptTypeId { get; set; }

        [Required]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Code { get; set; }

        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Description { get; set; }
    }
}
