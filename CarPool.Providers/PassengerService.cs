using CarPool.IServices;
using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CarPool.Domain.Entities;
using CarPool.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CarPool.Services
{
    public class PassengerService: IPassengerServie
    {
        protected readonly CarPoolDBContext _context;

        public PassengerService(CarPoolDBContext context)
        {
            _context = context;
        }
        public IQueryable<RideProvider> GetRidersList(Application.CarPool.Concern.PassengerRide bookedRide)
        {
                var list = _context.Rides.FromSqlRaw("Select * from Rides");
                    //.Include(s => s.Route)
                    //.Where(s => s.Route.Any(s => s.ViaPoints).ToString() == bookedRide.Boarding &&
                    //s.Route.ViaPoints.ToString() == bookedRide.Destination);
                return list;
        }

        public void RequestRider(Guid passengerRideId, Guid offeredRideId)
        {
                _context.RideRequests.Add(new RideRequest
                {
                    OfferedRideId = offeredRideId,
                    PassengerRideId = passengerRideId
                });
                _context.SaveChanges();
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
