using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// connection with database
builder.Services.AddDbContext<DataContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// generating app object like express
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// for check authantication purpose
app.UseAuthorization();

// map Controllers with some events
app.MapControllers();

// when load our aplication at that time our database get update
// use using bcz when we compelet use of scope that is automatically deleted
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    // this code is for generating the database
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync(); // if database is not present then it is create new one otherwise update previous one

    // add data into database
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An error occured during migration");
    throw;
}

app.Run();
