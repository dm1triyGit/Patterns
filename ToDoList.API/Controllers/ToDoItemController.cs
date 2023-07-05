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

        [HttpGet("[action]")]
        public async Task<IActionResult> Get(CancellationToken cancellation) 
        {
            var items = await _toDoListService.GetToDoItemsAsync(cancellation);
            return Ok(items);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Create(ToDoItem item, CancellationToken cancellation)
        {
            await _toDoListService.CreateToDoItemAsync(item, cancellation);
            return Ok();
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(ToDoItem item, CancellationToken cancellation)
        {
            await _toDoListService.UpdateToDoItemAsync(item, cancellation);
            return Ok();
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await _toDoListService.DeleteToDoItemAsync(id, cancellation);
            return Ok();
        }
    }
}
