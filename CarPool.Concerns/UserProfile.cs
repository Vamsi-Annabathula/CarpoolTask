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
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailAddress { get; set; }

        public long PhoneNumber { get; set; }
    }   
}
