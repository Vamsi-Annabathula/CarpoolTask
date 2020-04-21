using CarPool.Domain.Entities;
using CarPool.IServices;
using CarPool.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarPool.Api
{
    public class FareService: IFareService
    {
        protected readonly CarPoolDBContext _context;
        public FareService(CarPoolDBContext context)
        {
            _context = context;
        }
        public decimal CalculateFare(string id)
        {
            PassengerRide booking = _context.PassengerRides?.FirstOrDefault(s => s.Id == id);
            return booking.FarePerKM * booking.Distance;
            //DateTime.Now.Subtract(booking.StartTime).Minutes
        }
    }
}
