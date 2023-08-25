using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace UserManager.WebApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedLoginAttemptTypeMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "LoginAttemptType",
                columns: new[] { "ID", "Code", "Description" },
                values: new object[,]
                {
                    { 1, "SL", "Successful login" },
                    { 2, "USL", "Unsuccessful login" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LoginAttemptType",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LoginAttemptType",
                keyColumn: "ID",
                keyValue: 2);
        }
    }
}
