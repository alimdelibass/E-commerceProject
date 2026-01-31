using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.Persistence.Context
{
    public class ETicaretAPIDbContext : DbContext
    {
        public ETicaretAPIDbContext(
            DbContextOptions<ETicaretAPIDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<BaseEntities>();

            foreach (var entry in entries)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreateDate = DateTime.UtcNow;
                        entry.Entity.UpdateDate = DateTime.UtcNow;
                        entry.Entity.IsDelete = false;
                        break;

                    case EntityState.Modified:
                        entry.Entity.UpdateDate = DateTime.UtcNow;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.Entity.IsDelete = true;
                        entry.Entity.UpdateDate = DateTime.UtcNow;
                        break;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}
