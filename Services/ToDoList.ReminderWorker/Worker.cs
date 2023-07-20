using ToDoList.ReminderWorker.Abstractions.Services;

namespace ToDoList.ReminderWorker
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public Worker(ILogger<Worker> logger, IServiceScopeFactory serviceScopeFactory)
        {
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await DoWork(stoppingToken);
                }
                catch(Exception ex)
                {
                    _logger.LogError(ex.ToString());
                }

                await Task.Delay(1000, stoppingToken);
            }
        }

        private async Task DoWork (CancellationToken cancellationToken)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var toDoItemsService = scope.ServiceProvider.GetRequiredService<IToDoItemsService>();

            var itemsToRemind = await toDoItemsService.GetReminderItemsAsync(cancellationToken);

            if (itemsToRemind == null || itemsToRemind.Length == 0)
            {
                return;
            }

            var reminderService = scope.ServiceProvider.GetRequiredService<IReminderService>();

            await reminderService.RemindAsync(itemsToRemind, cancellationToken);
        }
    }
}