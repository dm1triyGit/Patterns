using ToDoList.Application.Interfaces.Repositories;

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

                await Task.Delay(60000, stoppingToken);
            }
        }

        private async Task DoWork (CancellationToken cancellationToken)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var repository = scope.ServiceProvider.GetRequiredService<IToDoListRepository>();

            var toDoList = await repository.GetToDoItemsAsync();
        }
    }
}