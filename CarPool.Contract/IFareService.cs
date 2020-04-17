using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IFareService
    {
        public decimal CalculateFare(decimal kms, DateTime startTime);
    }
}
