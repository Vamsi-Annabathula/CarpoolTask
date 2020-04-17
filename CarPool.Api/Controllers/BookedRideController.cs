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
    public class BookedRideController : ControllerBase
    {
        // GET: api/BookedRide
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BookedRide/5
        [HttpGet("{id}", Name = "GetBookedRide")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BookedRide
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/BookedRide/5
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
