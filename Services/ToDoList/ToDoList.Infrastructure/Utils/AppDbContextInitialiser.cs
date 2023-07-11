using ToDoList.Domain.Entities;
using ToDoList.Infrastructure.DataAccess;

namespace ToDoList.Infrastructure.Utils
{
    public class AppDbContextInitialiser
    {
        private readonly AppDbContext _context;

        public AppDbContextInitialiser(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync() 
        {
            if (!_context.ToDoItems.Any())
            {
                var toDoList = new List<ToDoItem>()
                {
                    new ToDoItem
                    {
                        Title = "Test Title 1", Comment = "Test Comment 1"
                    },
                    new ToDoItem
                    {
                        Title = "Test Title 2", Comment = "Test Comment 2"
                    },
                    new ToDoItem
                    {
                        Title = "Test Title 3", Comment = "Test Comment 3"
                    },
                };

                _context.ToDoItems.AddRange(toDoList);
                await _context.SaveChangesAsync();
            }
        }
    }
}
