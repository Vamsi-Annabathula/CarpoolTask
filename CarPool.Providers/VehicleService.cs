using CarPool.IServices;
using Application.CarPool.Concern;
using System;
using System.Linq;
using DE = CarPool.Domain.Entities;
using CarPool.Persistence;

namespace CarPool.Services
{
    public class VehicleService: IVehicleService
    {
        protected readonly CarPoolDBContext _context;
        public VehicleService(CarPoolDBContext carPoolContext)
        {
            _context = carPoolContext;
        }
        public void AddVehicle(Vehicle vehicle, long phoneNumber)
        {
            //Data.DataModels.UserInformation _user= _contextUser.Where(s => s.Id == user.Id).FirstOrDefault();
            DE.User userDetails = _context.User.Find(phoneNumber);
            userDetails.Vehicles.Add(new DE.Vehicle
            {
                VIN = vehicle.VIN,
                Capacity = vehicle.Capacity,
                UserId = userDetails.Id,
                IsRemoved = false
            });
            _context.SaveChanges();
        }
        public bool IsVehiclePresent(string VIN)
        {
            bool result = true;
                result = _context.Vehicles.Any(s => s.VIN == VIN) ? true : false;
            return result;
        }
        public void RemoveVehicle(string vin)
        {
                DE.Vehicle vehicle = _context.Vehicles.Find(vin);
                vehicle.IsRemoved = true;
                _context.SaveChanges();
        }
    }
}
