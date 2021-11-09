using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly StaffService _staffService;

        public StaffController(StaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpGet]
        public IEnumerable<Staff> GetStaff()
        {
            return _staffService.GetStaff();
        }

        [HttpPost]
        public Staff PostStaff(Staff newStaff)
        {
            return _staffService.PostStaff(newStaff);
        }
    }
}