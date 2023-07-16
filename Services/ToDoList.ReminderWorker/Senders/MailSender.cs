using ToDoList.Domain.Entities;
using ToDoList.ReminderWorker.Abstractions;

namespace ToDoList.ReminderWorker.Senders
{
    public class MailSender : IReminderSender
    {
        public Task SendReminderAsync(ToDoItem item, CancellationToken cancellation = default)
        {
            throw new NotImplementedException("mail sender");
        }
    }
}
