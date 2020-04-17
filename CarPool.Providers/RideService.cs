using CarPool.IServices;
using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CarPool.Domain.Entities;
using CarPool.Domain.Enum;
using CarPool.Persistence;

namespace CarPool.Services
{
    public class RideService: IRideService
    {
        protected readonly CarPoolDBContext _context;
        public RideService(CarPoolDBContext context)
        {
            _context = context;
        }
        public void PostRide(RideProvider ride)
        {
                var rideProvided = new RideProvider
                {
                    Boarding = ride.Boarding,
                    CreatedOn = DateTime.Now,
                    Destination = ride.Destination,
                    StartTime = ride.StartTime,
                    Status = RideStatusType.UpComing,
                    AvailableCapacity = ride.AvailableCapacity,
                    VehicleId = ride.Vehicle.Id,
                    UserId = ride.UserId,
                    Route = ride.Route,
                };
                _context.Rides.Add(rideProvided);
                _context.SaveChanges();
        }
        public void RequestRide(Domain.Entities.PassengerRide ride)
        {
                var rideRequested = new Domain.Entities.PassengerRide
                {
                    Boarding = ride.Boarding,
                    CreatedOn = DateTime.Now,
                    Destination = ride.Destination,
                    StartTime = ride.StartTime,
                    Status = RideStatusType.UpComing,
                    RequestedSeats = ride.RequestedSeats,
                    UserId = ride.UserId,
                    BookingStatus = BookingStatus.Pending,
                    RideFare = ride.RideFare
                };
                _context.PassengerRides.Add(rideRequested);
                _context.SaveChanges();
        }

        public void CancelOfferedRide(Guid offeredRideId)
        {
                _context.Rides.Where(s => s.Id == offeredRideId).FirstOrDefault().Status =  RideStatusType.Cancelled;
                var passengers  = _context.PassengerRides.Where(s => s.RideId == offeredRideId).Select(s => s);
                foreach (var iter in passengers)
                {
                    iter.BookingStatus = BookingStatus.Pending;
                    iter.Status = RideStatusType.Cancelled;
                }
                _context.SaveChanges();
        }

        public string CancelBookedRide(Guid passengerRideId)
        {
                var ride = _context.PassengerRides.Where(s => s.Id == passengerRideId).FirstOrDefault();
                var status = ride.Status;
                if (status != RideStatusType.Cancelled || status == RideStatusType.UpComing)
                {
                    status = RideStatusType.Cancelled;
                    ride.BookingStatus = BookingStatus.Cancelled;
                    _context.SaveChanges();
                    return "Cancelled";
                }
                else
                {
                    return "You cannot cancel ride at this moment";
                }
        }

        public void RescheduleOfferedRide(Guid offeredRideId, DateTime startTime)
        {
                _context.Rides.Where(s => s.Id == offeredRideId).FirstOrDefault().StartTime = startTime;
                var passengers = _context.PassengerRides.Where(s => s.RideId == offeredRideId).Select(s => s);
                foreach (var iter in passengers)
                {
                    iter.BookingStatus = BookingStatus.Pending;
                    iter.Status = RideStatusType.Cancelled;
                }
                _context.SaveChanges();
        }   

        
    }
}
