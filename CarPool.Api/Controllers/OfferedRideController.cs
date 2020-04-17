using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferedRideController : ControllerBase
    {
        // GET: api/OfferedRide
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/OfferedRide/5
        [HttpGet("{id}", Name = "GetOfferedRide")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/OfferedRide
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/OfferedRide/5
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
