using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Enums
{
    public enum OrderStatus
    {
        Pending = 1,      // Sipariş oluşturuldu
        Paid = 2,         // Ödeme alındı
        Preparing = 3,    // Hazırlanıyor
        Shipped = 4,      // Kargoya verildi
        Completed = 5,    // Teslim edildi
        Cancelled = 6
    }
}
