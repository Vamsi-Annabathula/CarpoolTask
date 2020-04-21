using Application.CarPool.Concern;
using CarPool.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.IServices
{
    public interface IUser
    {
        UserProfile GetUserProfile(string id);
    }
}
