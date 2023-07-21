using ToDoList.Domain.Enums;

namespace ToDoList.Domain.Entities
{
    public class ReminderItem
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime ReminderDate { get; set; }
        public ReminderStatuses ReminderStatus { get; set; }

        public int ToDoItemId { get; set; }
        public ToDoItem ToDoItem { get; set; }
    }
}
