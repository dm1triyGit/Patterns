using ToDoList.Application.Interfaces.Repositories;
using ToDoList.Application.Interfaces.Services;

namespace ToDoList.Application.Services
{
    public class ToDoListService : IToDoListService
    {
        public IToDoListRepository _toDoListRepository { get; }

        public ToDoListService(IToDoListRepository toDoListRepository)
        {
            _toDoListRepository = toDoListRepository;
        }
    }
}
