using CarPool.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IUserProfile
    {
        User GetUserProfile(long phoneNumber);
    }
}
