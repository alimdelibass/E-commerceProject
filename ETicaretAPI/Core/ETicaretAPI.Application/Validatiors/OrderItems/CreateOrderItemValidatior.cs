using ETicaretAPI.Application.ViewModels.OrderItems;
using FluentValidation;

namespace ETicaretAPI.Application.Validatiors.OrderItems
{
    public class CreateOrderItemValidatior : AbstractValidator<CreateOrderItem>
    {
        public CreateOrderItemValidatior()
        {
            RuleFor(oi => oi.OrderId).NotEmpty().WithMessage("Sipariş bilgisi boş geçilemez");
            RuleFor(oi => oi.ProductId).NotEmpty().WithMessage("Ürün bilgisi boş geçilemez");
            RuleFor(oi => oi.Quantity).GreaterThan(0).WithMessage("Adet 0'dan büyük olmalıdır");
            RuleFor(oi => oi.UnitPrice).GreaterThan(0).WithMessage("Birim fiyat 0'dan büyük olmalıdır");
        }
    }
}
