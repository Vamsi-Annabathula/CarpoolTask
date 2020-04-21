using CarPool.IServices;
using Con = Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CarPool.Domain.Entities;
using CarPool.Domain.Enum;
using CarPool.Persistence;
using CarPool.Concerns;
using CarPool.Providers;

namespace CarPool.Api
{
    public class RideService: IRideService
    {
        protected readonly CarPoolDBContext _context;
        public RideService(CarPoolDBContext context)
        {
            _context = context;
        }
        public void PostRide(Ride ride)
        {
            ride.Date = DateTime.Now;
            ride.Id = Guid.NewGuid().ToString();
            ride.Status = RideStatusType.UpComing;
            _context.Rides.Add(Mapper.Map<Ride, RideProvider>(ride));
            //var rideProvided = new Domain.Entities.RideProvider
            //{
            //    Boarding = ride.Boarding,
            //    CreatedOn = DateTime.Now,
            //    Destination = ride.Destination,
            //    StartTime = ride.StartTime,
            //    Status = RideStatusType.UpComing,
            //    AvailableCapacity = ride.AvailableCapacity,
            //    VehicleId = ride.VehicleId.Id,
            //    UserId = ride.UserId,
            //};
            //var rideRoute = new RideRoute
            //{

            //};
            _context.SaveChanges();
        }
        public void BookRide(Con.PassengerRide ride, string rideId)
        {
            ride.Id = Guid.NewGuid().ToString();
            ride.RideId = rideId;
            _context.PassengerRides.Add(Mapper.Map<Con.PassengerRide, PassengerRide>(ride));

            //var rideRequested = new Domain.Entities.PassengerRide
            //    {
            //        Boarding = ride.Boarding,
            //        CreatedOn = DateTime.Now,
            //        Destination = ride.Destination,
            //        StartTime = ride.StartTime,
            //        Status = RideStatusType.UpComing,
            //        RequestedSeats = ride.RequestedSeats,
            //        UserId = ride.UserId,
            //        BookingStatus = BookingStatus.Pending,
            //        RideFarePerKM = ride.RideFare
            //    };
            //    _context.PassengerRides.Add(rideRequested);
            _context.SaveChanges();
        }

        public bool CancelOfferedRide(string offeredRideId)
        {
            RideProvider ride = _context.Rides.FirstOrDefault(a => a.Id == offeredRideId);
            if (ride != null && GetRideBookings(offeredRideId).Any())
            {
                ride.Status = RideStatusType.Cancelled;
                _context.SaveChanges();
                return true;
            }

            return false;
            //_context.Rides.Where(s => s.Id == offeredRideId).FirstOrDefault().Status =  RideStatusType.Cancelled;
            //    var passengers  = _context.PassengerRides.Where(s => s.RideId == offeredRideId).Select(s => s);
            //    foreach (var iter in passengers)
            //    {
            //        iter.BookingStatus = BookingStatus.Pending;
            //        iter.Status = RideStatusType.Cancelled;
            //    }
            //    _context.SaveChanges();
        }

        public bool CancelBookedRide(string passengerRideId)
        {
            PassengerRide booking = _context.PassengerRides?.FirstOrDefault(a => a.Id == passengerRideId);
            if (booking != null && booking.BookingStatus == BookingStatus.Pending)
            {
                booking.BookingStatus = BookingStatus.Cancelled;
                _context.SaveChanges();
                return true;
            }
            return false;
            //var ride = _context.PassengerRides.Where(s => s.Id == passengerRideId).FirstOrDefault();
            //    var status = ride.Status;
            //    if (status != RideStatusType.Cancelled || status == RideStatusType.UpComing)
            //    {
            //        status = RideStatusType.Cancelled;
            //        ride.BookingStatus = BookingStatus.Cancelled;
            //        _context.SaveChanges();
            //        return "Cancelled";
            //    }
            //    else
            //    {
            //        return "You cannot cancel ride at this moment";
            //    }
        }

        public List<Con.PassengerRide> GetRideBookings(string rideId)
        {
            return Mapper.Map<List<PassengerRide>, List<Con.PassengerRide>>(_context.PassengerRides?.Where(booking => booking.RideId == rideId).ToList());
        }

        public List<Ride> GetRides(string userId)
        {
            return Mapper.Map<List<RideProvider>, List<Ride>>(this._context.Rides?.Where(ride => ride.UserId == userId).ToList());
        }

        //public void RescheduleOfferedRide(string offeredRideId, DateTime startTime)
        //{
        //}

    }
}
