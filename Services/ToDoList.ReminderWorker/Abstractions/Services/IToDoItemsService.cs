using ToDoList.Domain.Entities;

namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IToDoItemsService
    {
        Task<ToDoItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default);
    }
}
