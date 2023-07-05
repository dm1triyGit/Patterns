using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Services
{
    public interface IToDoListService
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation);
        Task<bool> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation);
        Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellation);
    }
}
