using CarPool.Domain.Entities;
using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarPool.IServices
{
    public interface IPassengerServie
    {
        IQueryable<RideProvider> GetRidersList(Application.CarPool.Concern.PassengerRide bookedRide);

        void RequestRider(Guid passengerRideId, Guid offeredRideId);
    }
}
