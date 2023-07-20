namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IMailSenderSevice
    {
        Task SendMailAsync(string email, string message, CancellationToken cancellationToken = default);
    }
}
