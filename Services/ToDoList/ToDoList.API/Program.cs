using NLog.Web;
using ToDoList.API.Extensions;
using ToDoList.Infrastructure.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Logging.ClearProviders();
builder.WebHost.UseNLog();
builder.Services.AddCors();

var app = builder.Build();
// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    {
        var initialiser = scope.ServiceProvider.GetRequiredService<AppDbContextInitialiser>();
        await initialiser.InitialiseAsync();
        await initialiser.SeedAsync();
    }
}
else
{
    //app.UseExceptionHandler(errorApp => errorApp.Run(context => context.HandleException(app.Logger)));
}
app.UseExceptionHandler(errorApp => errorApp.Run(context => context.HandleException(app.Logger)));

app.Map("/", () => "Hello I'm TodoServiceApi");

app.UseStaticFiles();
app.MapControllers();

app.Run();
