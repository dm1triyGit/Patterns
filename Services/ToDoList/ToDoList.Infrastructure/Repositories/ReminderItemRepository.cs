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
    }
}
