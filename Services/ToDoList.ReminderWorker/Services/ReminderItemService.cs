using Microsoft.EntityFrameworkCore;
using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions.Services;
using ToDoList.ReminderWorker.DataAccess;

namespace ToDoList.ReminderWorker.Services
{
    public class ReminderItemService : IReminderItemService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ReminderItemService> _logger;

        public ReminderItemService(AppDbContext context, ILogger<ReminderItemService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public Task<ReminderItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default)
        {
            var items = _context.ReminderItems
                .AsNoTracking()
                .Where(x => x.ReminderStatus != ReminderStatuses.Sended) //x => x.ReminderDate == DateTime.Now && x.ReminderStatus != ReminderStatuses.Sended
                .ToArrayAsync(cancellationToken);
            return items;
        }

        public async Task<bool> UpdateReminderItemStatusAsync(int id, ReminderStatuses status, CancellationToken cancellationToken = default)
        {
            var item = await _context.ReminderItems.FindAsync(id);

            if (item == null)
            {
                _logger.LogWarning($"There is no reminder item with id: {id}");
                return false;
            }

            item.ReminderStatus = status;
            var updated = await _context.SaveChangesAsync(cancellationToken);

            return updated > 0;
        }
    }
}
