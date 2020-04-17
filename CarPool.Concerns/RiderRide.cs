using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.Concerns
{
    public class RiderRide
    {
        public RiderRide()
        {
            ViaPoints = new HashSet<string>();
        }
        public string Id { get; set; }

        public string Boarding { get; set; }

        public string Destination { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
            
        public DateTime Date { get; set; }

        public Guid UserId { get; set; }

        public Vehicle Vehicle { get; set; }

        public IEnumerable<string> ViaPoints { get; set; }
    }
}
