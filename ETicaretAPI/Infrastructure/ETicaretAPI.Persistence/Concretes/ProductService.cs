using ETicaretAPI.Application.Abstractions;
using ETicaretAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Concretes
{
    public class ProductService : IProductService
    {
        public List<Product> GetProducts()
        => new() 
        { 
            new () { Id = Guid.NewGuid(),Name = "Urun 1", Price = 100, stock = 10 },
            new () { Id = Guid.NewGuid(),Name = "Urun 2", Price = 200, stock = 20 },
            new () { Id = Guid.NewGuid(),Name = "Urun 3", Price = 300, stock = 30 },
            new () { Id = Guid.NewGuid(),Name = "Urun 3", Price = 400, stock = 40 },
        };
    }
}
