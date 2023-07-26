using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions;

namespace ToDoList.ReminderWorker.Senders
{
    public class AbstractSender : IReminderSender
    {
        public Task<ReminderStatuses> SendReminderAsync(ReminderItem item, CancellationToken cancellation = default)
        {
            return Task.FromResult(ReminderStatuses.Sended);
        }
    }
}
