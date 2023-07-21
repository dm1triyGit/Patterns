namespace ToDoList.Domain.Entities
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ReminderDate { get; set; }

        public ReminderItem ReminderItem { get; set; }
    }
}
