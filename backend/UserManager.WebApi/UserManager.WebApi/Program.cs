using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Infrastructure;
using UserManager.WebApi.Infrastructure.Repositories;
using UserManager.WebApi.Interfaces.Infrastructure;
using UserManager.WebApi.Interfaces.Services;
using UserManager.WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

builder.Services.AddDbContext<UserContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ZenturyDb")));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

string[] corsOrigins = { "localhost:4200" };
app.UseCors(proxy => proxy.WithOrigins(corsOrigins).AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

//using (var scope = app.Services.CreateScope())
//{
//    var dbContext = scope.ServiceProvider
//        .GetRequiredService<UserContext>();

//    dbContext.Database.Migrate();
//}

app.Run();
