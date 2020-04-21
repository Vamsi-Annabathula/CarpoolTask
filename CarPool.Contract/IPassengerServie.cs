using CarPool.Domain.Entities;
using Con = Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CarPool.Concerns;

namespace CarPool.IServices
{
    public interface IPassengerServie
    {
        List<Ride> GetRidersList(Con.PassengerRide booking);

        //void RequestRider(stringpassengerRideId, string offeredRideId);
    }
}
