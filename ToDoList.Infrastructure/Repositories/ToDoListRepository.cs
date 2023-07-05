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

        public async Task CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            var createdItem = await _context.ToDoItems.FindAsync(item.Id);
            if (createdItem != null)
            {
                throw new Exception($"The Item with id: {item.Id} has already been created!");
            }

            await _context.ToDoItems.AddAsync(item, cancellation);
            await _context.SaveChangesAsync(cancellation);
        }

        public async Task UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            var itemToUpdate = await _context.ToDoItems.FindAsync(item.Id);
            if (itemToUpdate == null)
            {
                throw new Exception($"The Item with id: {item.Id} hasn't been created yet!");
            }

            _context.ToDoItems.Update(item);
            await _context.SaveChangesAsync(cancellation);
        }

        public async Task DeleteToDoItemAsync(int id, CancellationToken cancellation)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item == null)
            {
                throw new Exception($"The Item with id: {id} doesn't exist!");
            }

            _context.ToDoItems.Remove(item);
            await _context.SaveChangesAsync(cancellation);
        }
    }
}
