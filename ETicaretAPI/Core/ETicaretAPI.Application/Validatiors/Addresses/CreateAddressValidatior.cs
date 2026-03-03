using ETicaretAPI.Application.ViewModels.Addresses;
using FluentValidation;

namespace ETicaretAPI.Application.Validatiors.Addresses
{
    public class CreateAddressValidatior : AbstractValidator<CreateAddress>
    {
        public CreateAddressValidatior()
        {
            RuleFor(a => a.CustomerId).NotEmpty().WithMessage("Müşteri bilgisi boş geçilemez");
            RuleFor(a => a.Title).NotNull().NotEmpty().WithMessage("Adres başlığı boş geçilemez");
            RuleFor(a => a.City).NotNull().NotEmpty().WithMessage("Şehir boş geçilemez");
            RuleFor(a => a.District).NotNull().NotEmpty().WithMessage("İlçe boş geçilemez");
            RuleFor(a => a.FullAddress).NotNull().NotEmpty().WithMessage("Adres detayı boş geçilemez")
                .MinimumLength(10).WithMessage("Adres en az 10 karakter olmalıdır");
        }
    }
}
