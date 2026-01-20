using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entities
{
    public class Order : BaseEntities
    {
        public Guid CustomerId { get; set; }
        public Guid AddressId { get; set; }
        public string Description { get; set; }
        public decimal TotalPrice { get; set; } 
        public OrderStatus OrderStatus { get; set; }
        public ICollection<Product> Products { get; set; }
        public Customer Customer { get; set; }
        public Address Address { get; set; }

    }
}
