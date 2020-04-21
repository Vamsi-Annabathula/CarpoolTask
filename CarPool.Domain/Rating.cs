using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CarPool.Domain.Entities
{
    public class Rating
    {
        public int Stars { get; set; }

        [Key]
        [ForeignKey("RideId")]
        public string RideId { get; set; }
        public RideProvider Ride { get; set; }
    }
}
