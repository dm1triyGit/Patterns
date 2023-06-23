using Microsoft.EntityFrameworkCore;
using ToDoList.Domain.Entities;

namespace ToDoList.Application.Interfaces.DataAccess
{
    public interface IAppDbContext
    {
        DbSet<ToDoItem> ToDoItems { get; }
    }
}
