using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Services
{
    public interface IToDoListService
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation);
        Task CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task DeleteToDoItemAsync(int id, CancellationToken cancellation);
    }
}
