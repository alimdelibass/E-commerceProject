using ETicaretAPI.Application.ViewModels.Products;
using FluentValidation;

namespace ETicaretAPI.Application.Validatiors.Products
{
    public class CreateProductValidatior : AbstractValidator<CreateProduct>
    {
        public CreateProductValidatior()
        {
            RuleFor(p => p.Name).NotNull().NotEmpty().WithMessage("Ürün adı boş geçilemez");
            RuleFor(p => p.stock).GreaterThanOrEqualTo(0).WithMessage("Stok bilgisi 0'dan küçük olamaz");
            RuleFor(p => p.Price).NotNull().NotEmpty().WithMessage("Fiyat bilgisi boş geçilemez");
            RuleFor(p => p.Price).GreaterThan(0).WithMessage("Fiyat bilgisi 0'dan büyük olmalıdır");
        }
    }
}
