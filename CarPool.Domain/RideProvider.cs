using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarPool.Domain.Entities
{
    public class RideProvider
    {
        public RideProvider()
        {
            Ratings     = new HashSet<Rating>();
        }

        [Key]
        public string Id { get; set; }
        public string Boarding { get; set; }
        public string Destination { get; set; }
        public Decimal Distance { get; set; }
        public Decimal FarePerKm { get; set; }
        public DateTime StartTime { get; set; } 
        public DateTime EndTime { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public RideStatusType Status { get; set; }
        public string ViaPoints { get; set; }
        public int AvailableCapacity { get; set; }

        public string UserId { get; set; }    
        public User User { get; set; }
        public string VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public ICollection<Rating> Ratings { get;  set; }
        public ICollection<PassengerRide> Bookings { get; set; }
    }
}
