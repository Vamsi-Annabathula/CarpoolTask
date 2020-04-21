using System;
using System.Collections.Generic;
using System.Text;

namespace Application.CarPool.Concern
{
    public class PassengerRide
    {
        public string Id { get; set; }
        
        public string Boarding { get; set; }

        public string Destination { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public Decimal Distance { get; set; }

        public DateTime Date { get; set; }

        public string UserId { get; set; }

        public string RideId { get; set; }

        public int RequestedSeats { get; set; }

        public decimal RideFare { get; set; }
    }
}
