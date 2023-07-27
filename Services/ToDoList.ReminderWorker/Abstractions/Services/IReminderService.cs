using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IReminderService
    {
        Task RemindAsync(ReminderItem[] items, CancellationToken cancellationToken = default);
    }
}
