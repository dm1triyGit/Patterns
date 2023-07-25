using ToDoList.Application.Models;

namespace ToDoList.Application.Interfaces.Services
{
    public interface IToDoListService
    {
        Task<ToDoItemViewModel[]> GetToDoItemsAsync(CancellationToken cancellationToken = default);
        Task<ToDoItemViewModel?> CreateToDoItemAsync(ToDoItemViewModel item, CancellationToken cancellationToken = default);
        Task<bool> UpdateToDoItemAsync(ToDoItemViewModel item, CancellationToken cancellationToken = default);
        Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellationToken = default);
        Task<ToDoItemViewModel?> GetToDoItemByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
