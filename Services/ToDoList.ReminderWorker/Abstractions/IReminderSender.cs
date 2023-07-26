using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;

namespace ToDoList.ReminderWorker.Abstractions
{
    public interface IReminderSender
    {
        Task<ReminderStatuses> SendReminderAsync(ReminderItem item, CancellationToken cancellation = default);
    }
}
