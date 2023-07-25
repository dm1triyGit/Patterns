using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Infrastructure.DataAccess;
using ToDoList.Infrastructure.Repositories;
using ToDoList.Infrastructure.Utils;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("ToDoListDb"));
        }
        else
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(configuration.GetConnectionString("SQLiteConnection"));
                options.LogTo(Console.WriteLine, LogLevel.Information);
            });
        }

        services.AddScoped<AppDbContextInitialiser>();

        services.AddScoped<IToDoListRepository, ToDoListRepository>();
        services.AddScoped<IReminderItemRepository, ReminderItemRepository>();

        return services;
    }
}
