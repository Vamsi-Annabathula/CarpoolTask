using CarPool.Domain.Entities;
using CarPool.IServices;
using CarPool.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarPool.Services
{
    public class User: IUser
    {
        protected readonly CarPoolDBContext _context;

        public User(CarPoolDBContext context)
        {
            _context = context;
        }
        public Domain.Entities.User GetUserProfile(long phoneNumber)
        {
            return _context.User.Where(s=> s.PhoneNumber == phoneNumber).FirstOrDefault();
            
        }
    }
}
