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
                columns: new[] { "ID", "Email", "Password", "RegisteredDate", "Username" },
                values: new object[] { 1, "kvelail@gmail.com", "Kvelail1234", new DateTime(2023, 8, 25, 10, 8, 51, 327, DateTimeKind.Utc).AddTicks(4991), "kvelail" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1);
        }
    }
}
