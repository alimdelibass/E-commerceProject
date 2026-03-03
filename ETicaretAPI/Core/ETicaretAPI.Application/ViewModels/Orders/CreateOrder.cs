namespace ETicaretAPI.Application.ViewModels.Orders
{
    public class CreateOrder
    {
        public Guid CustomerId { get; set; }
        public Guid AddressId { get; set; }
        public string Description { get; set; }
    }
}
