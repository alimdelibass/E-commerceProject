using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Repositories
{
    public class OrderItemReadRepository : ReadRepository<OrderItem>, IOrderItemReadRepository
    {
        public OrderItemReadRepository(ETicaretAPIDbContext context) : base(context)
        {
        }
    }
}
