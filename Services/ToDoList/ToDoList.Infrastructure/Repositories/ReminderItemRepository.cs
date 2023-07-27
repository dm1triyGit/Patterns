using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Domain.Entities;
using ToDoList.Infrastructure.DataAccess;

namespace ToDoList.Infrastructure.Repositories
{
    public class ReminderItemRepository : IReminderItemRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ReminderItemRepository> _logger;

        public ReminderItemRepository(AppDbContext context, ILogger<ReminderItemRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> DeleteReminderItemAsync(int id, CancellationToken cancellationToken = default)
        {
            var item = await _context.ReminderItems.FindAsync(id);
            if (item == null)
            {
                _logger.LogWarning($"The Item with id: {id} doesn't exist!");
                return false;
            }

            _context.ReminderItems.Remove(item);
            var deleted = await _context.SaveChangesAsync(cancellationToken);

            return deleted > 0;
        }

        public async Task<ReminderItem?> GetReminderItemByItemIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var item = await _context.ReminderItems
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ToDoItemId == id, cancellationToken);

            if (item == null)
            {
                _logger.LogWarning($"The reminder item with id: {id} doesn't exist!");
            }

            return item;
        }

        public async Task<bool> SaveReminderItemAsync(ReminderItem item, CancellationToken cancellationToken = default)
        {
            var createdItem = await _context.ReminderItems.FindAsync(item.Id);
            if (createdItem != null)
            {
                _logger.LogWarning($"The reminder item with id: {item.Id} has already been created!");
                return false;
            }

            await _context.ReminderItems.AddAsync(item, cancellationToken);
            var created = await _context.SaveChangesAsync(cancellationToken);

            return created > 0;
        }

        public async Task<bool> UpdateReminderItemAsync(ReminderItem item, CancellationToken cancellationToken = default)
        {
            var itemToUpdate = await _context.ReminderItems
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == item.Id, cancellationToken);

            if (itemToUpdate == null)
            {
                _logger.LogWarning($"The Item with id: {item.Id} hasn't been created yet!");
                return false;
            }

            _context.ReminderItems.Update(item);
            var updated = await _context.SaveChangesAsync(cancellationToken);

            return updated > 0;
        }
    }
}
