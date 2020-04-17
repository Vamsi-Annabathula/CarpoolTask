using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.CarPool.Concern
{
    public class Payment
    {
        public string Payer { get; set; }

        public string Payee { get; set; }

        public DateTime PaidOn { get; set; }

        public PaymentStatus Status { get; set; }
    }
}
