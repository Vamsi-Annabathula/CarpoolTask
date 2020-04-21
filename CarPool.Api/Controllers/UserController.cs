using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CarPool.Concern;
using CarPool.Concerns;
using CarPool.Contract;
using CarPool.Domain.Entities;
using CarPool.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _userService;
        private readonly IAuthenticationService _authenticationService; 

        public UserController(IUser userService)
        {
            _userService = userService;
        }
        // GET: api/Profile
        [HttpGet]
        public IEnumerable<string> Get() 
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Profile
        [HttpGet]
        [ActionName("getuser")]
        public IActionResult GetUser(string id)
        {
            UserProfile user = _userService.GetUserProfile(id);

            if (user == null)
            {
                return NotFound(AppConstants.UserNotFound);
            }

            return Ok(user);
        }

        [HttpPost]
        [ActionName("register")]
        public IActionResult Register([FromBody] UserProfile user)
        {
            if (user == null)
            {
                return NoContent();
            }
            else if(_authenticationService.ValidateRegister(user.PhoneNumber, user.EmailAddress))
            {
                _authenticationService.UserRegistration(user);
                return Ok(user);
            }
            return BadRequest(AppConstants.UserAlreadyRegistered);
        }

        [HttpPost]
        [ActionName("login")]
        public IActionResult Login([FromBody] LoginForm user)
        {
            if (user == null)
            {
                return NoContent();
            }
            else if (_authenticationService.ValidateLogIn(user))
            {
                return Ok();
            }
            return BadRequest(AppConstants.LogInFailed);
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
