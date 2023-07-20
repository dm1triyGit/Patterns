using ToDoList.Domain.Entities;
using ToDoList.ReminderWorker.Abstractions;
using ToDoList.ReminderWorker.Abstractions.Services;

namespace ToDoList.ReminderWorker.Senders
{
    public class MailSender : IReminderSender
    {
        private readonly IMailSenderSevice _mailSenderSevice;

        public MailSender(IMailSenderSevice mailSenderSevice)
        {
            _mailSenderSevice = mailSenderSevice;
        }

        public async Task<bool> SendReminderAsync(ToDoItem item, CancellationToken cancellationToken = default)
        {
           return await _mailSenderSevice.SendMailAsync("login@yandex.ru", item.Title, cancellationToken); //TODO: брать email из юзера
        }
    }
}
