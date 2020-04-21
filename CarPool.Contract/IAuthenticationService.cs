using CarPool.Concerns;
using System;
using System.Collections.Generic;
using System.Text;
using Vm = Application.CarPool.Concern;

namespace CarPool.Contract
{
    public interface IAuthenticationService
    {
        bool ValidateLogIn(LoginForm loginForm);

        bool ValidateRegister(long phoneNumber, string emailAddress);

        void UserRegistration(Vm.UserProfile userRegistration);
    }
}
