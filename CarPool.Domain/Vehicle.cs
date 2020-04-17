using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarPool.Domain.Entities
{
    public class Vehicle
    {
        [Key]
        public Guid Id { get; set; }
        public string VIN { get; set; }
        public VehicleType Type { get; set; }
        public int Capacity { get; set; }
        public bool IsRemoved { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
        public RideProvider Ride { get; set; }
    }
}
