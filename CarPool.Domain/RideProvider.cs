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
            Route       = new HashSet<RideRoute>();
            RequestList = new HashSet<RideRequest>();
            Ratings     = new HashSet<Rating>();
        }

        [Key]
        public Guid Id { get; set; }
        public string Boarding { get; set; }
        public string Destination { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public RideStatusType Status { get; set; }
        public int AvailableCapacity { get; set; }

        public Guid UserId { get; set; }    
        public User User { get; set; }
        public Guid VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public ICollection<RideRoute> Route { get;  set; }
        public ICollection<RideRequest> RequestList { get;  set; }
        public ICollection<Rating> Ratings { get;  set; }
    }
}
