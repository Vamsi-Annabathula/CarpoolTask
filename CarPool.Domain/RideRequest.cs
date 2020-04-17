using System;
using CarPool.Domain.Enum;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarPool.Domain.Entities
{
    public class RideRequest
    {
        public Guid Id { get; set; }
        public RideRequestStatus Status { get; set; }

        public Guid PassengerRideId { get; set; }
        public Guid OfferedRideId { get; set; }
        public PassengerRide PassengerRide { get; set; }
        public RideProvider OfferedRide { get; set; }
    }
}
