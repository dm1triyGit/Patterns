namespace EventBus.Messages.Events
{
    public class ReminderSendedEvent : IntegrationBaseEvent
    {
        public bool IsReminderSended { get; set; }
        public int ToDoItemId { get; set; }
    }
}
