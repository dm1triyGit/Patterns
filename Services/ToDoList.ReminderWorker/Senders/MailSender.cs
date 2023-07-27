using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
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

        public async Task<ReminderStatuses> SendReminderAsync(ReminderItem item, CancellationToken cancellationToken = default)
        {
            var success = await _mailSenderSevice.SendMailAsync("login@yandex.ru", item.Message, cancellationToken); //TODO: брать email из юзера

            return success ? ReminderStatuses.Sended : ReminderStatuses.Error;
        }
    }
}
