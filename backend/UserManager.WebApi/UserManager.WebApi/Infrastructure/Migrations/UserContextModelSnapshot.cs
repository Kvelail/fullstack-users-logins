﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using UserManager.WebApi.Infrastructure;

#nullable disable

namespace UserManager.WebApi.Infrastructure.Migrations
{
    [DbContext(typeof(UserContext))]
    partial class UserContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("UserManager.WebApi.Infrastructure.Models.LoginAttemptType", b =>
                {
                    b.Property<int>("LoginAttemptTypeId")
                        .HasColumnType("integer")
                        .HasColumnName("ID")
                        .HasColumnOrder(0);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(2);

                    b.HasKey("LoginAttemptTypeId");

                    b.ToTable("LoginAttemptType", (string)null);

                    b.HasData(
                        new
                        {
                            LoginAttemptTypeId = 1,
                            Code = "SL",
                            Description = "Successful login"
                        },
                        new
                        {
                            LoginAttemptTypeId = 2,
                            Code = "USL",
                            Description = "Unsuccessful login"
                        });
                });

            modelBuilder.Entity("UserManager.WebApi.Infrastructure.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("ID")
                        .HasColumnOrder(0);

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(3);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(2);

                    b.Property<DateTime>("RegisteredDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnOrder(4);

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(1);

                    b.HasKey("UserId");

                    b.ToTable("User", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "kvelail@gmail.com",
                            Password = "Kvelail1234",
                            RegisteredDate = new DateTime(2023, 8, 25, 9, 22, 5, 805, DateTimeKind.Utc).AddTicks(3809),
                            Username = "kvelail"
                        });
                });

            modelBuilder.Entity("UserManager.WebApi.Infrastructure.Models.UserLoginAttempt", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnOrder(0);

                    b.Property<DateTime>("IssuedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnOrder(2);

                    b.Property<int>("LoginAttemptTypeId")
                        .HasColumnType("integer")
                        .HasColumnOrder(1);

                    b.Property<int>("UserId1")
                        .HasColumnType("integer");

                    b.HasKey("UserId");

                    b.HasIndex("LoginAttemptTypeId");

                    b.HasIndex("UserId1");

                    b.ToTable("UserLoginAttempt", (string)null);
                });

            modelBuilder.Entity("UserManager.WebApi.Infrastructure.Models.UserLoginAttempt", b =>
                {
                    b.HasOne("UserManager.WebApi.Infrastructure.Models.LoginAttemptType", "LoginAttemptType")
                        .WithMany()
                        .HasForeignKey("LoginAttemptTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UserManager.WebApi.Infrastructure.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LoginAttemptType");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
