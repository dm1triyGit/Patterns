using Microsoft.AspNetCore.Diagnostics;

namespace ToDoList.API.Extensions
{
    public static class ExceptionHandler 
    {
        public static Task HandleException(this HttpContext context, ILogger logger)
        {
            var exception = context.Features.Get<IExceptionHandlerPathFeature>()?.Error;
            if (exception != null)
            {
                logger.LogError(exception, "Unhandled exception");
            }

            context.Response.Clear();
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            return Task.FromResult(Task.CompletedTask);
        }
    }
}
