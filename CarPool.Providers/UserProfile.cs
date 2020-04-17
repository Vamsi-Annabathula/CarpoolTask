using CarPool.Domain.Entities;
using CarPool.IServices;
using CarPool.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarPool.Services
{
    public class UserProfile: IUserProfile
    {
        protected readonly CarPoolDBContext _context;

        public UserProfile(CarPoolDBContext context)
        {
            _context = context;
        }
        public User GetUserProfile(long phoneNumber)
        {
            return _context.User.Where(s=> s.PhoneNumber == phoneNumber).FirstOrDefault();
            
        }
    }
}
