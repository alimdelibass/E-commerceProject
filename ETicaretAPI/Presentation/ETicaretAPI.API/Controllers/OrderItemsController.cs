using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.ViewModels.OrderItems;
using ETicaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        readonly private IOrderItemWriteRepository _orderItemWriteRepository;
        readonly private IOrderItemReadRepository _orderItemReadRepository;

        public OrderItemsController(IOrderItemWriteRepository orderItemWriteRepository, IOrderItemReadRepository orderItemReadRepository)
        {
            _orderItemWriteRepository = orderItemWriteRepository;
            _orderItemReadRepository = orderItemReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orderItems = await _orderItemReadRepository.GetAll(false).ToListAsync();
            return Ok(orderItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var orderItem = await _orderItemReadRepository.GetByIdAsync(id, false);
            if (orderItem == null) return NotFound();
            return Ok(orderItem);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateOrderItem model)
        {
            await _orderItemWriteRepository.AddAsync(new OrderItem
            {
                OrderId = model.OrderId,
                ProductId = model.ProductId,
                Quantity = model.Quantity,
                UnitPrice = model.UnitPrice
            });
            await _orderItemWriteRepository.SaveAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] OrderItem orderItem)
        {
            _orderItemWriteRepository.Update(orderItem);
            await _orderItemWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _orderItemWriteRepository.RemoveAsync(id);
            await _orderItemWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
