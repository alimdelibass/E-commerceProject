using ETicaretAPI.Application.Validatiors.Products;
using ETicaretAPI.Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ETicaretAPI.Application.Features.Commands.CreateProduct.CreateProductCommandHandler).Assembly));
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidatior>();
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
