using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IVehicleService
    {
        void AddVehicle(Vehicle vehicle, long phoneNumber);

        bool IsVehiclePresent(string VIN);

        void RemoveVehicle(string vin);
    }
}
