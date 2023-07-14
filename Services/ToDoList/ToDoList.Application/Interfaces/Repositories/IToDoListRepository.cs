using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Repositories
{
    public interface IToDoListRepository
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation);
        Task<ToDoItem?> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellation);
    }
}
