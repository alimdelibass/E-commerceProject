using ETicaretAPI.Application.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : class
    {
        public DbSet<T> Table => throw new NotImplementedException();

        public Task<bool> AddAsync(T model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddAsync(List<T> model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Remove(T model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(T model)
        {
            throw new NotImplementedException();
        }
    }
}
