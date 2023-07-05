namespace OcelotApiGw.Extensions
{
    public static class EnvironmentExtension
    {
        const string LOCAL_ENV = "local";
        public static bool IsLocalDevelopment(this IHostEnvironment hostEnvironment)
        {
            if (hostEnvironment == null)
            {
                throw new ArgumentNullException(nameof(hostEnvironment));
            }

            return hostEnvironment.IsDevelopment()
                || hostEnvironment.IsEnvironment(LOCAL_ENV);
        }
    }
}
