using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarPool.Concerns;
using CarPool.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private IRideService _rideService;

        public RideController(IRideService rideService)
        {
            _rideService = rideService;
        }
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

        [HttpGet]
        [ActionName("yourrides")]
        public IActionResult GetUserRides(string id)
        {
            return Ok(_rideService.GetRides(id));
        }

        // POST: api/OfferedRide
        [HttpPost]
        [ActionName("offerRide")]
        public IActionResult AddNew([FromBody] Ride ride)
        {
            if (ride == null)
            {
                return NoContent();
            }
            _rideService.PostRide(ride);

            return Ok();
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
