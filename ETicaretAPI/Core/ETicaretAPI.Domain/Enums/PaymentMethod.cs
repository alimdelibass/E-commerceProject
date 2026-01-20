using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Enums
{
    public enum PaymentMethod
    {
        CreditCard = 1,        // Kredi / Banka Kartı
        BankTransfer = 2,      // EFT / Havale
        CashOnDelivery = 3,    // Kapıda Ödeme
        DigitalWallet = 4      // dijital Cuzdan Odeme
    }
}
