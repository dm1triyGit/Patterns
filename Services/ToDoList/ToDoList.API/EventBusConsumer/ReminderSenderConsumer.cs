using EventBus.Messages.Events;
using MassTransit;
using ToDoList.Application.Interfaces.Services;
using ToDoList.Domain.Enums;

namespace ToDoList.API.EventBusConsumer
{
    public class ReminderSenderConsumer : IConsumer<ReminderSendedEvent>
    {
        private readonly ILogger<ReminderSenderConsumer> _logger;
        private readonly IToDoListService _toDoListService;

        public ReminderSenderConsumer(ILogger<ReminderSenderConsumer> logger, IToDoListService toDoListService)
        {
            _logger = logger;
            _toDoListService = toDoListService;
        }

        public async Task Consume(ConsumeContext<ReminderSendedEvent> context)
        {
            var message = context.Message;
            var item = await _toDoListService.GetToDoItemByIdAsync(message.ToDoItemId);

            if (item == null || !message.IsReminderSended)
            {
                return;
            }

            //item.ReminderStatus = ReminderStatuses.Sended;
            await _toDoListService.UpdateToDoItemAsync(item);
        }
    }
}
