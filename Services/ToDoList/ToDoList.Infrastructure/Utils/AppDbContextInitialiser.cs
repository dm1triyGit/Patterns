using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoList.Domain.Entities;
using ToDoList.Infrastructure.DataAccess;

namespace ToDoList.Infrastructure.Utils
{
    public class AppDbContextInitialiser
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppDbContextInitialiser> _logger;

        public AppDbContextInitialiser(AppDbContext context, ILogger<AppDbContextInitialiser> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                if (_context.Database.IsSqlite())
                {
                    await _context.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        public async Task SeedAsync() 
        {
            if (!_context.ToDoItems.Any())
            {
                var toDoList = new List<ToDoItem>()
                {
                    new ToDoItem
                    {
                        Title = "Test Title 1", Comment = "Test Comment 1", CreatedDate = DateTime.Now
                    },
                    new ToDoItem
                    {
                        Title = "Test Title 2", Comment = "Test Comment 2", CreatedDate = DateTime.Now
                    },
                    new ToDoItem
                    {
                        Title = "Test Title 3", Comment = "Test Comment 3", CreatedDate = DateTime.Now
                    },
                };

                _context.ToDoItems.AddRange(toDoList);
                await _context.SaveChangesAsync();
            }
        }
    }
}
