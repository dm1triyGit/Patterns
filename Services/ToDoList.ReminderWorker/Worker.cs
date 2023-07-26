using ToDoList.ReminderWorker.Abstractions.Services;

namespace ToDoList.ReminderWorker
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly IConfiguration _configuration;

        public Worker(ILogger<Worker> logger, IServiceScopeFactory serviceScopeFactory, IConfiguration configuration)
        {
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
            _configuration = configuration;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var workerFrequency = _configuration.GetValue<int>("WorkerFrequency");

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

                await Task.Delay(workerFrequency, stoppingToken);
            }
        }

        private async Task DoWork (CancellationToken cancellationToken)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var toDoItemsService = scope.ServiceProvider.GetRequiredService<IReminderItemService>();

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