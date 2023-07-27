using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Repositories
{
    public interface IReminderItemRepository
    {
        Task<bool> SaveReminderItemAsync(ReminderItem item, CancellationToken cancellationToken = default);
        Task<bool> UpdateReminderItemAsync(ReminderItem item, CancellationToken cancellationToken = default);
        Task<bool> DeleteReminderItemAsync(int id, CancellationToken cancellationToken = default);
        Task<ReminderItem?> GetReminderItemByItemIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
