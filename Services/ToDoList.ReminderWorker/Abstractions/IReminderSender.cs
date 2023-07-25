using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions
{
    public interface IReminderSender
    {
        Task<bool> SendReminderAsync(ReminderItem item, CancellationToken cancellation = default);
    }
}
