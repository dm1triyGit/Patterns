using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IReminderItemService
    {
        Task<ReminderItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default);
    }
}
