using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.ViewModels.Orders;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        readonly private IOrderWriteRepository _orderWriteRepository;
        readonly private IOrderReadRepository _orderReadRepository;

        public OrdersController(IOrderWriteRepository orderWriteRepository, IOrderReadRepository orderReadRepository)
        {
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orders = await _orderReadRepository.GetAll(false).ToListAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var order = await _orderReadRepository.GetByIdAsync(id, false);
            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateOrder model)
        {
            await _orderWriteRepository.AddAsync(new Order
            {
                CustomerId = model.CustomerId,
                AddressId = model.AddressId,
                Description = model.Description,
                OrderStatus = OrderStatus.Pending
            });
            await _orderWriteRepository.SaveAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Order order)
        {
            _orderWriteRepository.Update(order);
            await _orderWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _orderWriteRepository.RemoveAsync(id);
            await _orderWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
