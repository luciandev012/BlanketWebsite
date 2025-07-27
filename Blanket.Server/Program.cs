using Blanket.Server.Models;
using Blanket.Server.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(option =>
    {
        option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        option.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddDbContext<BlanketDbContext>(option => option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(option =>
{
    option.AddPolicy("myCORS",
        policy =>
        {
            policy.WithOrigins("https://localhost:5173").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
        });
});

builder.Services.AddTransient<BrandServices>();
//builder.Services.AddTransient<AirConditionServices>();
builder.Services.AddTransient<ImageServices>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<BlanketDbContext>();
    dataContext.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseCors("myCORS");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
