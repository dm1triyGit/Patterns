using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Infrastructure.DataAccess;
using ToDoList.Infrastructure.Repositories;

namespace ToDoList.ReminderWorker
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWorkerServices(this IServiceCollection services, IConfiguration configuration)
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

            services.AddScoped<IToDoListRepository, ToDoListRepository>();

            return services;
        }
    }
}
