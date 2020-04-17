using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.CarPool.Concern
{
    public class Vehicle
    {
        public Guid Id { get; set; }

        public string VIN { get; set; }

        public VehicleType Type { get; set; }

        public int Capacity { get; set; }
    }
}
