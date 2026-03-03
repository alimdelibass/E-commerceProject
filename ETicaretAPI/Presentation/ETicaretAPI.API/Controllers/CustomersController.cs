using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.ViewModels.Customers;
using ETicaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        readonly private ICustomerWriteRepository _customerWriteRepository;
        readonly private ICustomerReadRepository _customerReadRepository;

        public CustomersController(ICustomerWriteRepository customerWriteRepository, ICustomerReadRepository customerReadRepository)
        {
            _customerWriteRepository = customerWriteRepository;
            _customerReadRepository = customerReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var customers = await _customerReadRepository.GetAll(false).ToListAsync();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var customer = await _customerReadRepository.GetByIdAsync(id, false);
            if (customer == null) return NotFound();
            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateCustomer model)
        {
            await _customerWriteRepository.AddAsync(new Customer
            {
                Name = model.Name,
                Surname = model.Surname,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                IsActive = true,
                IsCorporate = model.IsCorporate,
                CompanyName = model.CompanyName,
                TaxNumber = model.TaxNumber,
                TaxOffice = model.TaxOffice
            });
            await _customerWriteRepository.SaveAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Customer customer)
        {
            _customerWriteRepository.Update(customer);
            await _customerWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _customerWriteRepository.RemoveAsync(id);
            await _customerWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
