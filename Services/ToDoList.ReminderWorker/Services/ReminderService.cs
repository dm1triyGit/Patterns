using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions.Services;
using ToDoList.ReminderWorker.Factories;

namespace ToDoList.ReminderWorker.Services
{
    public class ReminderService : IReminderService
    {
        private readonly ReminderSenderResolver _senderResolver;

        public ReminderService(ReminderSenderResolver senderResolver)
        {
            _senderResolver = senderResolver;
        }

        public async Task RemindAsync(ToDoItem[] items, CancellationToken cancellationToken = default)
        {
            foreach (var item in items)
            {
                var sender = _senderResolver.GetSender(ReminderTypes.Email); //TODO: использовать ReminderType из модели

                var success = await sender.SendReminderAsync(item, cancellationToken);

                if (success)
                {
                    //отправить на шину данных событие об успешной отправке
                }
            }
        }
    }
}
