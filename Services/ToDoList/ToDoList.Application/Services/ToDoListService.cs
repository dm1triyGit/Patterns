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
        private readonly IReminderItemRepository _reminderItemRepository;
        private readonly ILogger<ToDoListService> _logger;
        private readonly IMapper _mapper;

        public ToDoListService(
            IToDoListRepository toDoListRepository,
            IReminderItemRepository reminderItemRepository,
            ILogger<ToDoListService> logger,
            IMapper mapper)
        {
            _toDoListRepository = toDoListRepository;
            _reminderItemRepository = reminderItemRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ToDoItemViewModel[]> GetToDoItemsAsync(CancellationToken cancellationToken)
        {
            var items = await _toDoListRepository.GetToDoItemsAsync(cancellationToken);

            return _mapper.Map<ToDoItemViewModel[]>(items);
        }

        public async Task<ToDoItemViewModel?> CreateToDoItemAsync(ToDoItemViewModel item, CancellationToken cancellationToken)
        {
            if (item == null)
            {
                _logger.LogWarning("The Item being created must not be null!");
                return null;
            }

            var itemToCreate = _mapper.Map<ToDoItem>(item);
            var createdItem = await _toDoListRepository.CreateToDoItemAsync(itemToCreate, cancellationToken);

            if (item.ReminderDate.HasValue && createdItem != null)
            {
                await CreateReminderItem(createdItem, cancellationToken);
            }

            return _mapper.Map<ToDoItemViewModel>(createdItem);
        }

        public async Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellationToken)
        {
            if (id == 0)
            {
                _logger.LogWarning("The Item id being deleted must not be 0!");
                return false;
            }

            var reminderItemId = (await _reminderItemRepository.GetReminderItemByItemIdAsync(id, cancellationToken))?.Id;
            if (reminderItemId.HasValue)
            {
                var reminderItemDeleted = await _reminderItemRepository.DeleteReminderItemAsync(reminderItemId.Value, cancellationToken);
                if (!reminderItemDeleted)
                {
                    _logger.LogWarning($"The Reminder item with TodoItem Id = {id} was not deleted!");
                }
            }

            return await _toDoListRepository.DeleteToDoItemAsync(id, cancellationToken);
        }

        public async Task<bool> UpdateToDoItemAsync(ToDoItemViewModel item, CancellationToken cancellationToken = default)
        {
            if (item == null)
            {
                _logger.LogWarning("The Item being updated must not be null!");
                return false;
            }

            var itemToUpdate = _mapper.Map<ToDoItem>(item);

            if (itemToUpdate.ReminderDate != null && !itemToUpdate.IsCompleted)
            { 
                var reminderItemId = (await _reminderItemRepository.GetReminderItemByItemIdAsync(item.Id, cancellationToken))?.Id;

                if (reminderItemId.HasValue)
                {
                    await UpdateReminderItem(reminderItemId.Value, itemToUpdate, cancellationToken);
                }
                else
                {
                    await CreateReminderItem(itemToUpdate, cancellationToken);
                }
            }

            if (itemToUpdate.IsCompleted)
            {
                var reminderItemId = (await _reminderItemRepository.GetReminderItemByItemIdAsync(item.Id, cancellationToken))?.Id;
                if(reminderItemId.HasValue)
                {
                    await DeleteReminderItem(reminderItemId.Value, itemToUpdate.Id, cancellationToken);
                }
            }

            return await _toDoListRepository.UpdateToDoItemAsync(itemToUpdate, cancellationToken);
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

        private async Task CreateReminderItem(ToDoItem item, CancellationToken cancellationToken = default)
        {
            var reminderItem = new ReminderItem
            {
                Message = item.Title,
                ReminderDate = item.ReminderDate.Value,
                ToDoItemId = item.Id
            };

            var remainderItemCreated = await _reminderItemRepository.SaveReminderItemAsync(reminderItem, cancellationToken);

            if (!remainderItemCreated)
            {
                _logger.LogWarning($"The Reminder item with TodoItem Id = {item.Id} was not created!");
            }
        }

        private async Task UpdateReminderItem(int reminderItemId, ToDoItem toDoItem, CancellationToken cancellationToken = default)
        {
            var reminderItemToUpdate = new ReminderItem
            {
                Id = reminderItemId,
                Message = toDoItem.Title,
                ReminderDate = toDoItem.ReminderDate.Value,
                ToDoItemId = toDoItem.Id,
            };

            var remainderItemUpdated = await _reminderItemRepository.UpdateReminderItemAsync(reminderItemToUpdate, cancellationToken);

            if (!remainderItemUpdated)
            {
                _logger.LogWarning($"The Reminder item with TodoItem Id = {toDoItem.Id} was not updated!");
            }
        }

        private async Task DeleteReminderItem(int reminderItemId, int toDoItemId, CancellationToken cancellationToken = default)
        {
            var remainderItemDeleted = await _reminderItemRepository.DeleteReminderItemAsync(reminderItemId, cancellationToken);

            if (!remainderItemDeleted)
            {
                _logger.LogWarning($"The Reminder item with TodoItem Id = {toDoItemId} was not updated!");
            }
        }
    }
}
