using Application.CarPool.Concern;
using CarPool.IServices;
using CarPool.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarPool.Services
{
    public class FareService: IFareService
    {
        protected readonly CarPoolDBContext _context;
        public FareService(CarPoolDBContext context)
        {
            _context = context;
        }
        public decimal CalculateFare(decimal kms, DateTime startTime )
        {
            return AppConstants.FarePerMin * DateTime.Now.Subtract(startTime).Minutes; 
        }

        public  void PostFare(Application.CarPool.Concern.UserProfile user, decimal fare)
        {
                var userInfo = _context.User.Where(s => s.PhoneNumber == user.PhoneNumber).FirstOrDefault();
                var ride = _context.PassengerRides.Where(s => s.UserId == userInfo.Id).FirstOrDefault();
                ride.RideFare = fare;
                _context.SaveChanges();
        }
    }
}
