using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CarPool.Domain.Enum;

namespace CarPool.Domain.Entities
{
    public class PassengerRide
    {
        [Key]
        public string Id { get; set; }
        public string Boarding { get; set; }
        public string Destination { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Decimal Distance { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public int RequestedSeats { get; set; }
        public decimal FarePerKM { get; set; }
        
        public string UserId { get; set; }
        public User User { get; set; }
        public string RideId { get; set; }
        public RideProvider Ride { get; set; }
    }
}
