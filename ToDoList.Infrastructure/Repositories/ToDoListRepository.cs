using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Domain.Entities;
using ToDoList.Infrastructure.DataAccess;

namespace ToDoList.Infrastructure.Repositories
{
    public class ToDoListRepository : IToDoListRepository
    {
        private readonly AppDbContext _context;

        public ToDoListRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation)
        {
            return (await _context.ToDoItems.ToArrayAsync(cancellation)).AsReadOnly();
        }

        public async Task<bool> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            var createdItem = await _context.ToDoItems.FindAsync(item.Id);
            if (createdItem != null)
            {
                throw new Exception($"The Item with id: {item.Id} has already been created!");
            }

            await _context.ToDoItems.AddAsync(item, cancellation);
            var created = await _context.SaveChangesAsync(cancellation);

            return created > 0;
        }

        public async Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            var itemToUpdate = await _context.ToDoItems.FindAsync(item.Id);
            if (itemToUpdate == null)
            {
                throw new Exception($"The Item with id: {item.Id} hasn't been created yet!");
            }

            _context.ToDoItems.Update(item);
            var updated = await _context.SaveChangesAsync(cancellation);

            return updated > 0;
        }

        public async Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellation)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item == null)
            {
                throw new Exception($"The Item with id: {id} doesn't exist!");
            }

            _context.ToDoItems.Remove(item);
            var deleted = await _context.SaveChangesAsync(cancellation);

            return deleted > 0;
        }
    }
}
