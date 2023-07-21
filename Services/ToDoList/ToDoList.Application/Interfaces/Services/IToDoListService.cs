using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Services
{
    public interface IToDoListService
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellationToken = default);
        Task<ToDoItem?> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellationToken = default);
        Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellationToken = default);
        Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellationToken = default);
        Task<ToDoItem> GetToDoItemByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
