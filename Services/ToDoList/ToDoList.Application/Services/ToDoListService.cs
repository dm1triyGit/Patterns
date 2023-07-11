using Microsoft.Extensions.Logging;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Application.Interfaces.Services;
using ToDoList.Domain.Entities;

namespace ToDoList.Application.Services
{
    public class ToDoListService : IToDoListService
    {
        private readonly IToDoListRepository _toDoListRepository;
        private readonly ILogger<ToDoListService> _logger;

        public ToDoListService(IToDoListRepository toDoListRepository, ILogger<ToDoListService> logger)
        {
            _toDoListRepository = toDoListRepository;
            _logger = logger;
        }

        public Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation)
        {
            return _toDoListRepository.GetToDoItemsAsync(cancellation);
        }

        public async Task<bool> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            if (item == null)
            {
                _logger.LogWarning("The Item being created must not be null!");
                return false;
            }

            return await _toDoListRepository.CreateToDoItemAsync(item, cancellation);
        }

        public async Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellation)
        {
            if (id == 0)
            {
                _logger.LogWarning("The Item id being deleted must not be 0!");
                return false;
            }

            return await _toDoListRepository.DeleteToDoItemAsync(id, cancellation);
        }

        public async Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            if (item == null)
            {
                _logger.LogWarning("The Item being updated must not be null!");
                return false;
            }

            return await _toDoListRepository.UpdateToDoItemAsync(item, cancellation);
        }
    }
}
