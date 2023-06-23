namespace ToDoList.Application.Models
{
    public class ToDoItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
        public bool IsCompleted { get; set; }
    }
}
