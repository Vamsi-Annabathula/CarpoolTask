using CarPool.IServices;
using Application.CarPool.Concern;
using System;
using System.Linq;
using DE = CarPool.Domain.Entities;
using CarPool.Persistence;
using CarPool.Providers;
using System.Collections.Generic;

namespace CarPool.Api
{
    public class VehicleService: IVehicleService
    {
        protected readonly CarPoolDBContext _context;
        public VehicleService(CarPoolDBContext carPoolContext)
        {
            _context = carPoolContext;
        }
        public void AddVehicle(Vehicle vehicle, string userId)
        {
            //Data.DataModels.UserInformation _user= _contextUser.Where(s => s.Id == user.Id).FirstOrDefault();
            if (userId != null)
            {
                vehicle.Id = Guid.NewGuid().ToString();
                vehicle.UserId = userId;
                _context.Vehicles.Add(Mapper.Map<Vehicle, DE.Vehicle>(vehicle));
                _context.SaveChanges();
            }
        }
        public bool IsVehiclePresent(string VIN)
        {
            return _context.Vehicles.Any(s => s.VIN == VIN) ? true : false;
        }
        public void RemoveVehicle(string vin)
        {
                DE.Vehicle vehicle = _context.Vehicles.Find(vin);
                vehicle.IsRemoved = true;
                _context.SaveChanges();
        }

        public IEnumerable<Vehicle> GetUserVehicle(string id)
        {
            return Mapper.Map<List<DE.Vehicle>, List<Vehicle>>(_context.Vehicles?.Where(a => a.UserId == id).Select(a => a).ToList()).AsEnumerable();
        }
    }
}
