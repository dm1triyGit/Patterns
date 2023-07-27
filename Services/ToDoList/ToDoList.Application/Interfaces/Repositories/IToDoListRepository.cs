using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Repositories
{
    public interface IToDoListRepository
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellationToken = default);
        Task<ToDoItem?> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellationToken = default);
        Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellationToken = default);
        Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellationToken = default);
    }
}
