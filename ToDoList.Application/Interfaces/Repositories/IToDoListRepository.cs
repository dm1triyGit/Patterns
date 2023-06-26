using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Repositories
{
    public interface IToDoListRepository
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation);
        Task<int> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task DeleteToDoItemAsync(int id, CancellationToken cancellation);
    }
}
