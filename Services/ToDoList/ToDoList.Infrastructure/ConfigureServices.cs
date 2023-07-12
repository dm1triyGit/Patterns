using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
                options.UseSqlite(configuration.GetConnectionString("SQLiteConnection")));
        }

        services.AddScoped<AppDbContextInitialiser>();

        services.AddScoped<IToDoListRepository, ToDoListRepository>();

        return services;
    }
}
