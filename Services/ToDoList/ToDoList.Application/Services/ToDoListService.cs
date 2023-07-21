using AutoMapper;
using Microsoft.Extensions.Logging;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Application.Interfaces.Services;
using ToDoList.Application.Models;
using ToDoList.Domain.Entities;

namespace ToDoList.Application.Services
{
    public class ToDoListService : IToDoListService
    {
        private readonly IToDoListRepository _toDoListRepository;
        private readonly ILogger<ToDoListService> _logger;
        private readonly IMapper _mapper;

        public ToDoListService(IToDoListRepository toDoListRepository, ILogger<ToDoListService> logger, IMapper mapper)
        {
            _toDoListRepository = toDoListRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ToDoItemViewModel[]> GetToDoItemsAsync(CancellationToken cancellation)
        {
            var items = await _toDoListRepository.GetToDoItemsAsync(cancellation);

            return _mapper.Map<ToDoItemViewModel[]>(items);
        }

        public async Task<ToDoItemViewModel?> CreateToDoItemAsync(ToDoItemViewModel item, CancellationToken cancellation)
        {
            if (item == null)
            {
                _logger.LogWarning("The Item being created must not be null!");
                return null;
            }

            var itemToCreate = _mapper.Map<ToDoItem>(item);
            var createdItem = await _toDoListRepository.CreateToDoItemAsync(itemToCreate, cancellation);

            return _mapper.Map<ToDoItemViewModel>(createdItem);
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

        public async Task<bool> UpdateToDoItemAsync(ToDoItemViewModel item, CancellationToken cancellation)
        {
            if (item == null)
            {
                _logger.LogWarning("The Item being updated must not be null!");
                return false;
            }

            var itemToUpdate = _mapper.Map<ToDoItem>(item);

            return await _toDoListRepository.UpdateToDoItemAsync(itemToUpdate, cancellation);
        }

        public async Task<ToDoItemViewModel?> GetToDoItemByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var item = (await GetToDoItemsAsync(cancellationToken))
                .FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                _logger.LogWarning($"There is no item with id = {id}");
            }

            return item;
        }
    }
}
