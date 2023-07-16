using ToDoList.Domain.Entities;
using ToDoList.ReminderWorker.Abstractions;

namespace ToDoList.ReminderWorker.Senders
{
    public class AbstractSender : IReminderSender
    {
        public Task SendReminderAsync(ToDoItem item, CancellationToken cancellation = default)
        {
            throw new NotImplementedException();
        }
    }
}
