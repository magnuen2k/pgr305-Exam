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

        [HttpGet("{id}")]
        public ActionResult<Staff> GetStaff(string id)
        {
            Staff staff = _staffService.GetStaff(id);

            return staff != null ? staff : NotFound();
        }

        [HttpPost]
        public Staff PostStaff(Staff newStaff)
        {
            return _staffService.PostStaff(newStaff);
        }

        [HttpPut]
        public IActionResult PutStaff(Staff staffIn)
        {
            var staff = _staffService.GetStaff(staffIn.Id);

            if (staff == null)
            {
                return NotFound();
            }
            
            _staffService.UpdateStaff(staffIn);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStaff(string id)
        {
            var staff = _staffService.GetStaff(id);

            if (staff == null)
            {
                return NotFound();
            }

            _staffService.RemoveStaff(staff.Id);
            return NoContent();
        }
    }
}