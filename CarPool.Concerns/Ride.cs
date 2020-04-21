using Application.CarPool.Concern;
using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.Concerns
{
    public class Ride
    {
        public Ride()
        {

        }
        public string Id { get; set; }

        public string Boarding { get; set; }

        public string Destination { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
            
        public DateTime Date { get; set; }

        public Decimal Distance { get; set; }

        public Decimal RaidFarePerKM { get; set; }

        public int AvailableCapacity { get; set; }

        public string UserId { get; set; }

        public string VehicleId { get; set; }

        public string ViaPoints { get; set; }

        public RideStatusType Status{ get; set; }
    }
}
