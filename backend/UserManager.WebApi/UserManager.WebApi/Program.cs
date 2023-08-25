using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserManager.WebApi.Infrastructure;
using UserManager.WebApi.Infrastructure.Repositories;
using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Interfaces.Services;
using UserManager.WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services
    .AddAuthentication(cfg =>
    {
        cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(jwtBearerOptions =>
    {
        jwtBearerOptions.SaveToken = true;
        jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateActor = false,
            ValidateIssuer = true,
            RequireExpirationTime = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Authentication:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Authentication:Key"]))
        };
    });

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IUserLoginService, UserLoginService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserLoginRepository, UserLoginRepository>();

builder.Services.AddDbContext<UserContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ZenturyDb")));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

string[] corsOrigins = { "localhost:4200" };
app.UseCors(proxy => proxy.WithOrigins(corsOrigins).AllowAnyMethod());

//app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider
        .GetRequiredService<UserContext>();

    dbContext.Database.Migrate();
}

app.Run();
