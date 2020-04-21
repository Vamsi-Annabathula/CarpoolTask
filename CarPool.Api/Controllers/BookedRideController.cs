using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CarPool.Concern;
using CarPool.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookedRideController : ControllerBase
    {
        private IPassengerServie _bookingService;
        private IRideService _rideService;

        public BookedRideController(IPassengerServie bookingService, IRideService rideService)
        {
            _bookingService = bookingService;
            _rideService = rideService;
        }
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

        [AllowAnonymous]
        [HttpGet]
        [ActionName("riderslist")]
        public IActionResult GetRidesOffers(PassengerRide booking)
        {
            return Ok(_bookingService.GetRidersList(booking));
        }

        // POST: api/BookRide
        [HttpPost]
        [ActionName("createbooking")]
        public IActionResult CreateBookig([FromBody]PassengerRide booking, string rideId)
        {
            if (booking == null)
            {
                return BadRequest();
            }
            _rideService.BookRide(booking, rideId);
            return Ok();
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
