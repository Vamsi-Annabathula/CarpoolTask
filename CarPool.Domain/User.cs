using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPool.Domain.Entities
{
    public class User
    {
        public User()
        {
            Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        public string Id { get; set; }    
        public string Name { get; set; }

        [Phone]
        [Required]
        public long PhoneNumber { get; set; }

        [Required]                                                  
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
        public bool IsRemoved { get; set; }

        public ICollection<RideProvider> Rides { get; set; }
        public ICollection<PassengerRide> Bookings { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}
