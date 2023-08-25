using Microsoft.EntityFrameworkCore;
using UserManager.WebApi.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

string[] corsOrigins = { "localhost:4200" };
app.UseCors(proxy => proxy.WithOrigins(corsOrigins).AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider
        .GetRequiredService<UserContext>();

    dbContext.Database.Migrate();
}

app.Run();
