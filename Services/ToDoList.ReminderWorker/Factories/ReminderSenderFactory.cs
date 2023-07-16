using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions;
using ToDoList.ReminderWorker.Senders;

namespace ToDoList.ReminderWorker.Factories
{
    public class ReminderSenderFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public ReminderSenderFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IReminderSender Create(ReminderTypes reminderType)
        {
            switch (reminderType)
            {
                case ReminderTypes.Email:
                    return GetRequiredService<MailSender>();
                default:
                    throw new ArgumentException($"Unsupported reminder type {reminderType}");
            }
        }

        private IReminderSender GetRequiredService<T>() where T : class
        {
            var services = _serviceProvider.GetServices<IReminderSender>();
            return services.First(o => o.GetType() == typeof(T));
        }
    }
}
