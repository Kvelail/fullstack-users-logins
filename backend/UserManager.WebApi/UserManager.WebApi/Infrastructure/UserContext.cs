using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Infrastructure.Models;

namespace UserManager.WebApi.Infrastructure
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserLoginAttempt> UserLoginAttempts { get; set; } = null!;
        public virtual DbSet<LoginAttemptType> LoginAttempts { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=postgres;Username=postgres;Password=kvelail1234;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>()
                .ToTable("User");

            modelBuilder
                .Entity<UserLoginAttempt>()
                .ToTable("UserLoginAttempt");

            modelBuilder
                .Entity<LoginAttemptType>()
                .ToTable("LoginAttemptType");

            //modelBuilder
            //    .Entity<LoginAttemptType>()
            //    .HasData(
            //        new LoginAttemptType
            //        {
            //            LoginAttemptTypeId = 1,
            //            Code = "SL",
            //            Description = "Successful login"
            //        },
            //        new LoginAttemptType
            //        {
            //            LoginAttemptTypeId = 2,
            //            Code = "USL",
            //            Description = "Unsuccessful login"
            //        });

            //modelBuilder
            //    .Entity<User>()
            //    .HasData(new User
            //    {
            //        UserId = 1,
            //        Username = "kvelail",
            //        Password = EncryptionHelper.EncryptBase64("Kvelail123"),
            //        Email = "kvelail@gmail.com",
            //        RegisteredDate = DateTime.UtcNow
            //    });
        }
    }
}
