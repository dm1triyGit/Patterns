using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.ReminderWorker.Abstractions.Services;
using ToDoList.ReminderWorker.Factories;

namespace ToDoList.ReminderWorker.Services
{
    public class ReminderService : IReminderService
    {
        private readonly ReminderSenderResolver _senderResolver;
        private readonly IReminderItemService _reminderItemService;
        private readonly ILogger<ReminderService> _logger;

        public ReminderService(ReminderSenderResolver senderResolver, IReminderItemService reminderItemService, ILogger<ReminderService> logger)
        {
            _senderResolver = senderResolver;
            _reminderItemService = reminderItemService;
            _logger = logger;
        }

        public async Task RemindAsync(ReminderItem[] items, CancellationToken cancellationToken = default)
        {
            foreach (var item in items)
            {
                var sender = _senderResolver.GetSender(ReminderTypes.Abstract); //TODO: использовать ReminderType из модели

                var status = await sender.SendReminderAsync(item, cancellationToken);

                var success = await _reminderItemService.UpdateReminderItemStatusAsync(item.Id, status, cancellationToken);
                if (!success)
                {
                    _logger.LogWarning($"Reminder item with id: {item.Id} was not updated!");
                }
            }
        }
    }
}
