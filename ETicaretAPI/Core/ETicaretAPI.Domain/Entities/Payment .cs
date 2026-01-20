using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entities
{
    public class Payment : BaseEntities
    {
        public Guid OrderId { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; } 
        public Order Order { get; set; }
    }
}
