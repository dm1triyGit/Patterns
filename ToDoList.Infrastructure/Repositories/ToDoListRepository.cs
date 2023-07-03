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
            await _context.ToDoItems.AddAsync(item, cancellation);
            await _context.SaveChangesAsync(cancellation);
        }

        public async Task UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation)
        {
            _context.ToDoItems.Update(item);
            await _context.SaveChangesAsync(cancellation);
        }

        public async Task DeleteToDoItemAsync(int id, CancellationToken cancellation)
        {
            var item = await _context.ToDoItems.FindAsync(new object?[] { id }, cancellationToken: cancellation);
            if (item != null)
            {
                _context.ToDoItems.Remove(item);
                await _context.SaveChangesAsync(cancellation);
            }
        }
    }
}
