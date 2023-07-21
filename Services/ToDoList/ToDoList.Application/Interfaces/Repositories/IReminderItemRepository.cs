using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Repositories
{
    public interface IReminderItemRepository
    {
        Task<bool> SaveReminderItemAsync(ReminderItem item, CancellationToken cancellationToken = default);
    }
}
