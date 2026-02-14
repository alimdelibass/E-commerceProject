using ETicaretAPI.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddCors(options => options.AddPolicy("AllowAll", builder =>
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));


builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.Run();
