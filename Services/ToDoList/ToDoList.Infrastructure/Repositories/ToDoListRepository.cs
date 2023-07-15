﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Domain.Entities;
using ToDoList.Infrastructure.DataAccess;

namespace ToDoList.Infrastructure.Repositories
{
    public class ToDoListRepository : IToDoListRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ToDoListRepository> _logger;

        public ToDoListRepository(AppDbContext context, ILogger<ToDoListRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyCollection<ToDoItem>> GetToDoItemsAsync(CancellationToken cancellation = default)
        {
            return (await _context.ToDoItems.ToArrayAsync(cancellation)).AsReadOnly();
        }

        public async Task<ToDoItem?> CreateToDoItemAsync(ToDoItem item, CancellationToken cancellation = default)
        {
            var createdItem = await _context.ToDoItems.FindAsync(item.Id);
            if (createdItem != null)
            {
                _logger.LogWarning($"The Item with id: {item.Id} has already been created!");
                return null;
            }

            await _context.ToDoItems.AddAsync(item, cancellation);
            var created = await _context.SaveChangesAsync(cancellation);

            return created > 0 ? item : null;
        }

        public async Task<bool> UpdateToDoItemAsync(ToDoItem item, CancellationToken cancellation = default)
        {
            var itemToUpdate = await _context.ToDoItems
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == item.Id, cancellation);

            if (itemToUpdate == null)
            {
                _logger.LogWarning($"The Item with id: {item.Id} hasn't been created yet!");
                return false;
            }

            _context.ToDoItems.Update(item);
            var updated = await _context.SaveChangesAsync(cancellation);

            return updated > 0;
        }

        public async Task<bool> DeleteToDoItemAsync(int id, CancellationToken cancellation = default)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item == null)
            {
                _logger.LogWarning($"The Item with id: {id} doesn't exist!");
                return false;
            }

            _context.ToDoItems.Remove(item);
            var deleted = await _context.SaveChangesAsync(cancellation);

            return deleted > 0;
        }
    }
}
