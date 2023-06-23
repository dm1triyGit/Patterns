using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Repositories
{
    public interface IToDoListRepository
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation);
        Task SaveToDoItemAsync(ToDoItem item);
        Task DeleteToDoItemAsync(ToDoItem item);
    }
}
