using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions
{
    public interface IReminderSender
    {
        Task<bool> SendReminderAsync(ToDoItem item, CancellationToken cancellation = default);
    }
}
