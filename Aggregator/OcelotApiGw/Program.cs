using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using OcelotApiGw.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Configuration.AddJsonFile($"ocelot.{builder.Environment.EnvironmentName}.json", true, true);
builder.Services.AddOcelot();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsLocalDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseCors(builder => builder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                  .AllowAnyHeader());
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/", async context =>
    {
        await context.Response.WriteAsync("Hello I'm OcelotApiGateway!");
    });
});

await app.UseOcelot();

app.Run();
