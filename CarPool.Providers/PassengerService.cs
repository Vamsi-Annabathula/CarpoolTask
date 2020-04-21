using CarPool.IServices;
using CC = Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CarPool.Domain.Entities;
using CarPool.Persistence;
using Microsoft.EntityFrameworkCore;
using CarPool.Concerns;
using Newtonsoft.Json;
using CarPool.Providers;

namespace CarPool.Api
{
    public class PassengerService: IPassengerServie
    {
        protected readonly CarPoolDBContext _context;

        public PassengerService(CarPoolDBContext context)
        {
            _context = context;
        }
        
        public List<Ride> GetRidersList(CC.PassengerRide booking)
        {
            int count = 0;
            List<RideProvider> rides = new List<RideProvider>();
            foreach (var ride in _context.Rides)
            {
                count++;
                var viaPoints = JsonConvert.DeserializeObject<List<ViaPoint>>(ride.ViaPoints);

                if (viaPoints.IndexOf(viaPoints.FirstOrDefault(a => a.Area.Equals(booking.Destination))) >
                    viaPoints.IndexOf(viaPoints.FirstOrDefault(a => a.Area.Equals(booking.Boarding)))
                    && ride.StartTime == booking.StartTime && ride.AvailableCapacity > 0)
                {
                    rides.Add(ride);
                }
            }

            return Mapper.Map<List<RideProvider>, List<Ride>>(rides);
        }

        //public void MakePayment(BookedRide bookedRide, PostedRide postedRide)
        //{
        //    postedRide.Payments.Add(new Payment
        //    {
        //        PaidOn = DateTime.Now,
        //        Payee = postedRide.Rider.FirstName,
        //        Payer = postedRide.Rider.FirstName,
        //        Status = PaymentStatus.Pending
        //    });
        //    bookedRide.Payment.PaidOn = DateTime.Now;
        //    bookedRide.Payment.Payer = bookedRide.User.FirstName;
        //    bookedRide.Payment.Payee = bookedRide.Rider.FirstName;
        //    bookedRide.Payment.Status = PaymentStatus.Pending;
        //}
    }
}
