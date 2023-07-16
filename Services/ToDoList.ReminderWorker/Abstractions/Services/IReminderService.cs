using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IReminderService
    {
        Task RemindAsync(ToDoItem[] items, CancellationToken cancellationToken = default);
    }
}
