using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Application.Interfaces.Services;
using ToDoList.Domain.Entities;

namespace ToDoList.Application.Services
{
    public class ToDoListService : IToDoListService
    {
        private readonly IToDoListRepository _toDoListRepository;

        public ToDoListService(IToDoListRepository toDoListRepository)
        {
            _toDoListRepository = toDoListRepository;
        }

        public Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation)
        {
            return _toDoListRepository.GetToDoItemsAsync(cancellation);
        }

        public Task CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            return _toDoListRepository.CreateToDoItemAsync(item, cancellation);
        }

        public Task DeleteToDoItemAsync(int id, CancellationToken cancellation)
        {
            return _toDoListRepository.DeleteToDoItemAsync(id, cancellation);
        }

        public Task UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            return _toDoListRepository.UpdateToDoItemAsync(item, cancellation);
        }
    }
}
