using ETicaretAPI.Application.ViewModels.Customers;
using FluentValidation;

namespace ETicaretAPI.Application.Validatiors.Customers
{
    public class CreateCustomerValidatior : AbstractValidator<CreateCustomer>
    {
        public CreateCustomerValidatior()
        {
            RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("Müşteri adı boş geçilemez");
            RuleFor(c => c.Surname).NotNull().NotEmpty().WithMessage("Müşteri soyadı boş geçilemez");
            RuleFor(c => c.Email).NotNull().NotEmpty().WithMessage("Email boş geçilemez")
                .EmailAddress().WithMessage("Geçerli bir email adresi giriniz");
            RuleFor(c => c.PhoneNumber).NotNull().NotEmpty().WithMessage("Telefon numarası boş geçilemez")
                .MinimumLength(10).WithMessage("Telefon numarası en az 10 karakter olmalıdır");
            RuleFor(c => c.CompanyName).NotEmpty().When(c => c.IsCorporate)
                .WithMessage("Kurumsal müşteriler için şirket adı zorunludur");
            RuleFor(c => c.TaxNumber).NotEmpty().When(c => c.IsCorporate)
                .WithMessage("Kurumsal müşteriler için vergi numarası zorunludur");
            RuleFor(c => c.TaxOffice).NotEmpty().When(c => c.IsCorporate)
                .WithMessage("Kurumsal müşteriler için vergi dairesi zorunludur");
        }
    }
}
