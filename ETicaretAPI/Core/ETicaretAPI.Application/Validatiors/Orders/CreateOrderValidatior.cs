using ETicaretAPI.Application.ViewModels.Orders;
using FluentValidation;

namespace ETicaretAPI.Application.Validatiors.Orders
{
    public class CreateOrderValidatior : AbstractValidator<CreateOrder>
    {
        public CreateOrderValidatior()
        {
            RuleFor(o => o.CustomerId).NotEmpty().WithMessage("Müşteri bilgisi boş geçilemez");
            RuleFor(o => o.AddressId).NotEmpty().WithMessage("Adres bilgisi boş geçilemez");
            RuleFor(o => o.Description).NotNull().NotEmpty().WithMessage("Açıklama boş geçilemez")
                .MinimumLength(5).WithMessage("Açıklama en az 5 karakter olmalıdır");
        }
    }
}
