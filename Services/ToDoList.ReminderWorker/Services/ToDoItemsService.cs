using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions.Services;

namespace ToDoList.ReminderWorker.Services
{
    public class ToDoItemsService : IToDoItemsService
    {
        private readonly IToDoListRepository _repository;

        public ToDoItemsService(IToDoListRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default)
        {
            return (await _repository.GetToDoItemsAsync(cancellationToken))
                .Where(x => !x.IsCompleted
                    && x.ReminderDate.ToShortDateString() == DateTime.UtcNow.ToShortDateString())
                .ToArray();
        }
    }
}
