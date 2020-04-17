using CarPool.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.CarPool.Concern
{
    public class Rate
    {
        public string RideId { get; set; }

        public string BookingId { get; set; }

        public RatingType Rating { get; set; }
    }
}
