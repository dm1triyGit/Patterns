using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Domain.Entities;

namespace ToDoList.Infrastructure.Repositories
{
    public class ToDoListRepository : IToDoListRepository
    {
        public Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation)
        {
            throw new NotImplementedException();
        }

        public Task<int> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            throw new NotImplementedException();
        }

        public Task UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            throw new NotImplementedException();
        }

        public Task DeleteToDoItemAsync(int id, CancellationToken cancellation)
        {
            throw new NotImplementedException();
        }
    }
}
