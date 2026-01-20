using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Enums
{
    public enum PaymentStatus
    {
        Pending = 1,      // Ödeme bekleniyor
        Success = 2,      // Başarılı
        Failed = 3,       // Başarısız
        Refunded = 4      // Iptal edildi
    }
}
