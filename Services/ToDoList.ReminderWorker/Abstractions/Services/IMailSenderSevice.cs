namespace ToDoList.ReminderWorker.Abstractions.Services
{
    public interface IMailSenderSevice
    {
        Task<bool> SendMailAsync(string email, string message, CancellationToken cancellationToken = default);
    }
}
