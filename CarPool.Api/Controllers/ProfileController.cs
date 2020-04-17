using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarPool.Domain.Entities;
using CarPool.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserProfile _userprofile;

        public ProfileController(IUserProfile userProfile)
        {
            _userprofile = userProfile;
        }
        // GET: api/Profile
        [HttpGet]
        public IEnumerable<string> Get() 
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Profile/5
        [HttpGet("{phoneNumber}", Name = "GetProfile")]
        public User Get(long phoneNumber)
        {
            return _userprofile.GetUserProfile(phoneNumber);
        }

        // POST: api/Profile
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Profile/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
