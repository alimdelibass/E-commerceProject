using ETicaretAPI.Application.ViewModels.Payments;
using FluentValidation;

namespace ETicaretAPI.Application.Validatiors.Payments
{
    public class CreatePaymentValidatior : AbstractValidator<CreatePayment>
    {
        public CreatePaymentValidatior()
        {
            RuleFor(p => p.OrderId).NotEmpty().WithMessage("Sipariş bilgisi boş geçilemez");
            RuleFor(p => p.Amount).GreaterThan(0).WithMessage("Tutar 0'dan büyük olmalıdır");
            RuleFor(p => p.PaymentMethod).IsInEnum().WithMessage("Geçerli bir ödeme yöntemi seçiniz");
        }
    }
}
