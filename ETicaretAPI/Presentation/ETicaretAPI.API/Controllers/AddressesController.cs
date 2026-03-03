using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.ViewModels.Addresses;
using ETicaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        readonly private IAddressWriteRepository _addressWriteRepository;
        readonly private IAddressReadRepository _addressReadRepository;

        public AddressesController(IAddressWriteRepository addressWriteRepository, IAddressReadRepository addressReadRepository)
        {
            _addressWriteRepository = addressWriteRepository;
            _addressReadRepository = addressReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var addresses = await _addressReadRepository.GetAll(false).ToListAsync();
            return Ok(addresses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var address = await _addressReadRepository.GetByIdAsync(id, false);
            if (address == null) return NotFound();
            return Ok(address);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateAddress model)
        {
            await _addressWriteRepository.AddAsync(new Address
            {
                CustomerId = model.CustomerId,
                Title = model.Title,
                City = model.City,
                District = model.District,
                FullAddress = model.FullAddress,
                IsDefault = model.IsDefault
            });
            await _addressWriteRepository.SaveAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Address address)
        {
            _addressWriteRepository.Update(address);
            await _addressWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _addressWriteRepository.RemoveAsync(id);
            await _addressWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
