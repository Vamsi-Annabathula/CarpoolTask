using System;
using System.Collections.Generic;
using System.Text;
using Vm = Application.CarPool.Concern;

namespace CarPool.Contract
{
    public interface IAuthenticationService
    {
        bool ValidateLogIn(Vm.UserProfile userRegistration, string password);

        bool ValidateRegister(Vm.UserProfile userRegistration);

        void UserRegistration(Vm.UserProfile userRegistration, string password);
    }
}
