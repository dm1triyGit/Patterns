using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ToDoList.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureSettings<TOptions>(this IServiceCollection services, IConfiguration configuration) where TOptions : class
        {
            services.Configure<TOptions>(configuration.GetSection(typeof(TOptions).Name));

            return services;
        }
    }
}
