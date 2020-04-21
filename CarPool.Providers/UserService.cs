using Application.CarPool.Concern;
using CarPool.Domain.Entities;
using CarPool.IServices;
using CarPool.Persistence;
using CarPool.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarPool.Api
{
    public class UserService: IUser
    {
        protected readonly CarPoolDBContext _context;

        public UserService(CarPoolDBContext context)
        {
            _context = context;
        }
        public UserProfile GetUserProfile(string id)
        {
            return Mapper.Map<User, UserProfile> (_context.Users.Where(s => s.Id == id).FirstOrDefault());
        }
    }
}
