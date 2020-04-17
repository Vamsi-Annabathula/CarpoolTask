using CarPool.Domain.Enum;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;

namespace CarPool.Domain.Entities
{
    public class RideRoute
    {
        public Guid Id { get; set; }
        public string ViaPoints { get; set; }

        [ForeignKey("RideId")]
        public Guid RideId { get; set; }    
        public RideProvider Ride { get; set; }

    }
}
