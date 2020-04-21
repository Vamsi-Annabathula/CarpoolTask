using System;
using System.Collections.Generic;
using System.Text;

namespace Application.CarPool.Concern
{
    public class UserProfile
    {
        public UserProfile()
        {

        }
        public string Id { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public string EmailAddress { get; set; }

        public long PhoneNumber { get; set; }
    }   
}
