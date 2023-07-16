using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions.Services;
using ToDoList.ReminderWorker.Factories;

namespace ToDoList.ReminderWorker.Services
{
    public class ReminderService : IReminderService
    {
        private readonly ReminderSenderFactory _senderFactory;

        public ReminderService(ReminderSenderFactory senderFactory)
        {
            _senderFactory = senderFactory;
        }

        public async Task RemindAsync(ToDoItem[] items, CancellationToken cancellationToken = default)
        {
            foreach (var item in items)
            {
                var sender = _senderFactory.Create(ReminderTypes.Email);

                await sender.SendReminderAsync(item, cancellationToken);
            }
        }
    }
}
