using CarPool.Domain.Entities;
using Con = Application.CarPool.Concern;
using System;
using CarPool.Concerns;
using System.Collections.Generic;

namespace CarPool.IServices
{
    public interface IRideService
    {
        void PostRide(Ride ride);

        void BookRide(Con.PassengerRide ride, string rideId);

        bool CancelOfferedRide(string offeredRideId);

        bool CancelBookedRide(string passengerRideId);

        List<Con.PassengerRide> GetRideBookings(string rideId);

        List<Ride> GetRides(string userId);

        //void RescheduleOfferedRide(string offeredRideId, DateTime startTime);

    }         
}
