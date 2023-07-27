using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;

namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IReminderItemService
    {
        Task<ReminderItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default);
        Task<bool> UpdateReminderItemStatusAsync(int id, ReminderStatuses status, CancellationToken cancellationToken = default);
    }
}
