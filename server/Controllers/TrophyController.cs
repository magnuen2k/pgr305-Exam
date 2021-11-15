using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrophyController : ControllerBase
    {
        private readonly TrophyService _trophyService;

        public TrophyController(TrophyService trophyService)
        {
            _trophyService = trophyService;
        }

        [HttpGet]
        public IEnumerable<Trophy> GetTrophies()
        {
            return _trophyService.GetTrophies();
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<Trophy> GetTrophy(string id)
        {
            Trophy trophy = _trophyService.GetTrophy(id);

            return trophy != null ? trophy : NotFound();
        }

        [HttpPost]
        public Trophy PostTrophy(Trophy newTrophy)
        {
            return _trophyService.PostTrophy(newTrophy);
        }

        [HttpPut]
        public IActionResult PutTrophy(Trophy trophyIn)
        {
            var trophy = _trophyService.GetTrophy(trophyIn.Id);

            if (trophy == null)
            {
                return NotFound();
            }
            
            _trophyService.UpdateTrophy(trophyIn);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult DeleteTrophy(string id)
        {
            var trophy = _trophyService.GetTrophy(id);

            if (trophy == null)
            {
                return NotFound();
            }
            
            _trophyService.RemoveTrophy(trophy.Id);
            return NoContent();
        }
    }
}