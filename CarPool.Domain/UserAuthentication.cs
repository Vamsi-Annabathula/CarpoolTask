using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CarPool.Domain.Entities
{
    public class UserAuthentication
    {
        [Key]
        public Guid Id { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
