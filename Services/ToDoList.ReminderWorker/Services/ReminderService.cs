using EventBus.Messages.Events;
using MassTransit;
using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions.Services;
using ToDoList.ReminderWorker.Factories;

namespace ToDoList.ReminderWorker.Services
{
    public class ReminderService : IReminderService
    {
        private readonly ReminderSenderResolver _senderResolver;
        private readonly IPublishEndpoint _publishEndpoint;

        public ReminderService(ReminderSenderResolver senderResolver, IPublishEndpoint publishEndpoint)
        {
            _senderResolver = senderResolver;
            _publishEndpoint = publishEndpoint;
        }

        public async Task RemindAsync(ToDoItem[] items, CancellationToken cancellationToken = default)
        {
            foreach (var item in items)
            {
                var sender = _senderResolver.GetSender(ReminderTypes.Email); //TODO: использовать ReminderType из модели

                var success = await sender.SendReminderAsync(item, cancellationToken);
                await _publishEndpoint.Publish(new ReminderSendedEvent { IsReminderSended = true, ToDoItemId = item.Id });
                if (success)
                {
                    await _publishEndpoint.Publish(new ReminderSendedEvent { IsReminderSended = success, ToDoItemId = item.Id });
                }
            }
        }
    }
}
