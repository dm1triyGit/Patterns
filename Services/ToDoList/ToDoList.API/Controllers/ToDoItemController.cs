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
            var createdItem = await _toDoListService.CreateToDoItemAsync(item, cancellation);

            return createdItem != null
                ? Ok(createdItem)
                : BadRequest();
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(ToDoItem item, CancellationToken cancellation)
        {
            var isUpdated = await _toDoListService.UpdateToDoItemAsync(item, cancellation);

            return isUpdated ? Ok() : BadRequest();
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            var isDeleted = await _toDoListService.DeleteToDoItemAsync(id, cancellation);

            return isDeleted ? Ok() : BadRequest();
        }
    }
}
