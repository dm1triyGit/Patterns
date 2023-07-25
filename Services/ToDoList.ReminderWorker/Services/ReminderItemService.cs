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

        public ReminderItemService(AppDbContext context)
        {
            _context = context;
        }

        public Task<ReminderItem[]> GetReminderItemsAsync(CancellationToken cancellationToken = default)
        {
            var items = _context.ReminderItems
                .AsNoTracking()
                .Where(x => x.ReminderStatus != ReminderStatuses.Sended) //x => x.ReminderDate == DateTime.Now && x.ReminderStatus != ReminderStatuses.Sended
                .ToArrayAsync(cancellationToken);
            return items;
        }
    }
}
