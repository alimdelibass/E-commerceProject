using ETicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entities
{
    public class Address : BaseEntities
    {
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }

        public string Title { get; set; }  
        public string City { get; set; }
        public string District { get; set; }
        public string FullAddress { get; set; }

        public bool IsDefault { get; set; }
    }
}
