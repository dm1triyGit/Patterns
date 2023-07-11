using ToDoList.Application.Interfaces.Services;
using ToDoList.Application.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IToDoListService, ToDoListService>();

        return services;
    }
}
