namespace ETicaretAPI.Application.ViewModels.Addresses
{
    public class CreateAddress
    {
        public Guid CustomerId { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string FullAddress { get; set; }
        public bool IsDefault { get; set; }
    }
}
