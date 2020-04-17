using CarPool.Domain.Entities;
using System;
  
namespace CarPool.IServices
{
    public interface IRideService
    {
        void PostRide(RideProvider ride);

        void RequestRide(PassengerRide ride);

        void CancelOfferedRide(Guid offeredRideId);

        string CancelBookedRide(Guid passengerRideId);

        void RescheduleOfferedRide(Guid offeredRideId, DateTime startTime);

    }         
}
