using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserManager.WebApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InsertDefaultUserMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "Email", "Password", "RegisteredDate", "Username" },
                values: new object[] { 1, "kvelail@gmail.com", "Kvelail123", new DateTime(2023, 8, 25, 16, 6, 18, 292, DateTimeKind.Utc).AddTicks(3323), "kvelail" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1);
        }
    }
}
