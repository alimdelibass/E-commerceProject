using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.ViewModels.Payments;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        readonly private IPaymentWriteRepository _paymentWriteRepository;
        readonly private IPaymentReadRepository _paymentReadRepository;

        public PaymentsController(IPaymentWriteRepository paymentWriteRepository, IPaymentReadRepository paymentReadRepository)
        {
            _paymentWriteRepository = paymentWriteRepository;
            _paymentReadRepository = paymentReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var payments = await _paymentReadRepository.GetAll(false).ToListAsync();
            return Ok(payments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var payment = await _paymentReadRepository.GetByIdAsync(id, false);
            if (payment == null) return NotFound();
            return Ok(payment);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreatePayment model)
        {
            await _paymentWriteRepository.AddAsync(new Payment
            {
                OrderId = model.OrderId,
                PaymentMethod = model.PaymentMethod,
                Amount = model.Amount,
                PaymentStatus = PaymentStatus.Pending
            });
            await _paymentWriteRepository.SaveAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Payment payment)
        {
            _paymentWriteRepository.Update(payment);
            await _paymentWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _paymentWriteRepository.RemoveAsync(id);
            await _paymentWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
