using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using OcelotApiGw.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Configuration.AddJsonFile($"ocelot.{builder.Environment.EnvironmentName}.json", true, true);
builder.Services.AddOcelot();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsLocalDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();
await app.UseOcelot();

app.Run();
