using ToDoList.Configuration;
using ToDoList.Configuration.Options;

namespace ToDoList.ReminderWorker
{
    public static class ConfigureAppSettings
    {
        public static IServiceCollection ConfigureOptions(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.ConfigureSettings<MailOptions>(configuration);
            services.ConfigureSettings<SmtpClientOptions>(configuration);

            return services;
        }
    }
}
