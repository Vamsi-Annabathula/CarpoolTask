using Application.CarPool.Concern;
using CarPool.Persistence;
using System.Linq;
using De = CarPool.Domain.Entities;
using Vm = Application.CarPool.Concern;

namespace CarPool.Services
{
    public class AuthenticationService
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
        public bool ValidateLogIn(Vm.UserProfile userRegistration, string password)
        {
            var user = _context.User.Where(s => s.PhoneNumber == userRegistration.PhoneNumber).FirstOrDefault();
            string userPassword = _context.UserAuth.Where(s => s.UserId == user.Id).FirstOrDefault().Password;
            //var user = _context.UserAuth.Find(userRegistration.PhoneNumber);
            if (user == null)
            {
                return false;
            }
            else
            {
                return user.PhoneNumber == userRegistration.PhoneNumber && userPassword == password;
            }

        }
        public bool ValidateRegister(Vm.UserProfile userRegistration)
        {
                if (_context.User.Find(userRegistration.PhoneNumber) == null)
                {
                    return true;
                }
                else if (_context.User.Find(userRegistration.EmailAddress) == null)
                {
                    return true;
                }
            return false;
        }

        public void UserRegistration(Vm.UserProfile userRegistration, string password)
        {
                _context.User.Add(new De.User
                {
                    FirstName = userRegistration.FirstName,
                    LastName = userRegistration.LastName,
                    PhoneNumber = userRegistration.PhoneNumber,
                    Email = userRegistration.EmailAddress,
                    UserAuth = new De.UserAuthentication { IsActive = true, Password = password }
                });
                _context.SaveChanges();
        }
    }
}
