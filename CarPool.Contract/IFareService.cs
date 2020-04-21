using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IFareService
    {
        decimal CalculateFare(string id);
    }
}
