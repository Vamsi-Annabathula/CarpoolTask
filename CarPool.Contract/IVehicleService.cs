using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IVehicleService
    {
        void AddVehicle(Vehicle vehicle, string userId);

        bool IsVehiclePresent(string VIN);

        void RemoveVehicle(string vin);

        IEnumerable<Vehicle> GetUserVehicle(string id);
    }
}
