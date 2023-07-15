using ToDoList.ReminderWorker;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddWorkerServices(hostContext.Configuration);
        services.AddHostedService<Worker>();
    })
    .Build();

host.Run();
