using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Interfaces.DataAccess;
using ToDoList.Domain.Entities;

namespace ToDoList.Infrastructure.DataAccess
{
    public class AppDbContext: DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}
