using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.Services
{
    public interface IToDoListService
    {
        Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation);
        Task SaveToDoItemAsync(ToDoItem item);
        Task DeleteToDoItemAsync(ToDoItem item);
    }
}
