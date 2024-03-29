﻿using System.Collections.Generic;
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

        [HttpGet("{id:length(24)}")]
        public ActionResult<Staff> GetStaff(string id)
        {
            Staff staff = _staffService.GetStaff(id);

            return staff != null ? staff : NotFound();
        }

        [HttpPost]
        public IActionResult PostStaff(Staff newStaff)
        {
            var staff = _staffService.PostStaff(newStaff);

            if (staff == null)
            {
                return NotFound();
            }

            return Created($"/api/staff/{staff.Id}", staff);
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

        [HttpDelete("{id:length(24)}")]
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