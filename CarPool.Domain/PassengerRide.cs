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
        public Guid Id { get; set; }
        public string Boarding { get; set; }
        public string Destination { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public RideStatusType Status { get; set; }
        public int RequestedSeats { get; set; }
        public decimal RideFare { get; set; }
        
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid RideId { get; set; }
        public RideProvider Ride { get; set; }
    }
}
