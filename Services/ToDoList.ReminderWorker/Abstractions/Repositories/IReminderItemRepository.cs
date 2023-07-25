using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions.Repositories
{
    public interface IReminderItemRepository
    {
        Task<ToDoItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default);
    }
}
