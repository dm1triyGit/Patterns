using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using ToDoList.Configuration.Options;
using ToDoList.ReminderWorker.Abstractions.Services;

namespace ToDoList.ReminderWorker.Services
{
    public class MailSenderService : IMailSenderSevice
    {
        private readonly MailOptions _mailOptions;
        private readonly SmtpClientOptions _smtpClientOptions;

        public MailSenderService(IOptions<MailOptions> mailOptions, IOptions<SmtpClientOptions> smtpClientOptions)
        {
            _mailOptions = mailOptions.Value;
            _smtpClientOptions = smtpClientOptions.Value;
        }

        public async Task SendMailAsync(string email, string message, CancellationToken cancellationToken = default)
        {
            using var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(_mailOptions.SenderName, _mailOptions.SenderAddress));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = _mailOptions.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpClientOptions.Host, _smtpClientOptions.Port, true, cancellationToken);
            await client.AuthenticateAsync(_mailOptions.SenderAddress, _mailOptions.SenderPassword, cancellationToken);
            await client.SendAsync(emailMessage, cancellationToken);

            await client.DisconnectAsync(true, cancellationToken);
        }
    }
}
