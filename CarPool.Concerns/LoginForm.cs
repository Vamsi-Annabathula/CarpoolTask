using Application.CarPool.Concern;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.Concerns
{
    public class LoginForm
    {
        public LoginForm()
        {

        }
        public long PhoneNumber { get; set; }

        public string Password { get; set; }
    }
}
