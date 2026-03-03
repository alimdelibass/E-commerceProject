using ETicaretAPI.Domain.Enums;

namespace ETicaretAPI.Application.ViewModels.Payments
{
    public class CreatePayment
    {
        public Guid OrderId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public decimal Amount { get; set; }
    }
}
