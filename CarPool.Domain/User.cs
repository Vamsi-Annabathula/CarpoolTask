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
        public Guid Id { get; set; }    
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Phone]
        [Required]
        public long PhoneNumber { get; set; }

        [Required]                                                  
        [EmailAddress]
        public string Email { get; set; }

        public UserAuthentication UserAuth { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}
