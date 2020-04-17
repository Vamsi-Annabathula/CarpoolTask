using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IRiderService
    {
        void EndPassengerTrip(Guid passengerRideId);

        void StartPassengerTrip(Guid passengerRideId);

        string AcceptPassenger(Guid passengerRideId, Guid offeredRideId);

        void AddPassenger(Guid offeredRideId, int requiredSeats);

        decimal AverageRating(Guid offeredRideId);

        void EndPostedRide(Guid offeredRideId);
    }
}
