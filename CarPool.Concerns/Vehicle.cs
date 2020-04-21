using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.CarPool.Concern
{
    public class Vehicle
    {
        public string Id { get; set; }

        public string VIN { get; set; }

        public string UserId { get; set; }

        public VehicleType Type { get; set; }

        public int Capacity { get; set; }
    }
}
