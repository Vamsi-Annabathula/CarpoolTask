using Application.CarPool.Concern;
using CarPool.Concerns;
using CarPool.Contract;
using CarPool.Persistence;
using CarPool.Providers;
using System;
using System.Linq;
using De = CarPool.Domain.Entities;
using Vm = Application.CarPool.Concern;

namespace CarPool.Api
{
    public class AuthenticationService: IAuthenticationService
    {
        protected readonly CarPoolDBContext _context;

        public AuthenticationService(CarPoolDBContext context)
        {
            _context = context;
        }
        //private readonly UsersRepo usersRepo;
        //public AuthenticationService(UsersRepo usersRepo)
        //{
        //    this.usersRepo = usersRepo;
        //}

        //TODO LOGIN
        public bool ValidateLogIn(LoginForm loginForm)
        {
            var user = _context.Users.Where(s => s.PhoneNumber == loginForm.PhoneNumber).FirstOrDefault();
            //var user = _context.UserAuth.Find(userRegistration.PhoneNumber);
            if (user == null)
            {
                return false;
            }
            else
            {
                return user.PhoneNumber == loginForm.PhoneNumber && user.Password == loginForm.Password;
            }

        }
        public bool ValidateRegister(long phoneNumber, string emailAddress)
        {
                if (_context.Users.Find(phoneNumber) == null)
                {
                    return true;
                }
                else if (_context.Users.Find(emailAddress) == null)
                {
                    return true;
                }
            return false;
        }

        public void UserRegistration(UserProfile userRegistration)
        {
            userRegistration.Id = Guid.NewGuid().ToString();
            var userData = Mapper.Map<UserProfile, De.User>(userRegistration);
            _context.Users.Add(userData);
            //_context.User.Add(new De.User
            //    {
            //        Name = userRegistration.Name,
            //        LastName = userRegistration.LastName,
            //        PhoneNumber = userRegistration.PhoneNumber,
            //        Email = userRegistration.EmailAddress,
            //        UserAuth = new De.UserAuthentication { IsActive = true, Password = password }
            //    });
            _context.SaveChanges();
        }
    }
}
