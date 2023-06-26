using Microsoft.AspNetCore.Mvc;
using ToDoList.Application.Interfaces.Services;
using ToDoList.Domain.Entities;

namespace ToDoList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemController : ControllerBase
    {
        private readonly IToDoListService _toDoListService;

        public ToDoItemController(IToDoListService toDoListService)
        {
            _toDoListService = toDoListService;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<ToDoItem>> Get(CancellationToken cancellation) 
        {
            return await _toDoListService.GetToDoItemsAsync(cancellation);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(ToDoItem item, CancellationToken cancellation)
        {
            return await _toDoListService.CreateToDoItemAsync(item, cancellation);
        }

        [HttpPut]
        public async Task<IActionResult> Update(ToDoItem item, CancellationToken cancellation)
        {
            await _toDoListService.UpdateToDoItemAsync(item, cancellation);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await _toDoListService.DeleteToDoItemAsync(id, cancellation);
            return Ok();
        }
    }
}
