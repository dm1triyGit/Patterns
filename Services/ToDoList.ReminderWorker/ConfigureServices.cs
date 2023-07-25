using Microsoft.EntityFrameworkCore;
using ToDoList.ReminderWorker.Abstractions;
using ToDoList.ReminderWorker.Abstractions.Services;
using ToDoList.ReminderWorker.DataAccess;
using ToDoList.ReminderWorker.Factories;
using ToDoList.ReminderWorker.Senders;
using ToDoList.ReminderWorker.Services;

namespace ToDoList.ReminderWorker
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWorkerServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("SQLiteConnection")));

            services.AddScoped<IReminderItemService, ReminderItemService>();
            services.AddScoped<IReminderService, ReminderService>();
            services.AddScoped<IMailSenderSevice, MailSenderService>();

            services.AddScoped<ReminderSenderResolver>();

            services.AddScoped<IReminderSender, MailSender>();
            services.AddScoped<IReminderSender, AbstractSender>();

            return services;
        }
    }
}
