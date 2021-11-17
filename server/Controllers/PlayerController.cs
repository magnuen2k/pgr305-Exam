using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService _playerService;
        public PlayerController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public IEnumerable<Player> GetPlayers()
        {
            return _playerService.GetPlayers();
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<Player> GetPlayer(string id)
        {
            Player player = _playerService.GetPlayer(id);

            return player != null ? player : NotFound();
        }

        [HttpPost]
        public IActionResult PostPlayer(Player newPlayer)
        {
            var player = _playerService.PostPlayer(newPlayer);

            if (player == null)
            {
                return NotFound();
            }
            
            return Created($"/api/player/{player.Id}", player);
        }

        [HttpPut]
        public IActionResult PutPlayer(Player playerIn)
        {
            var player = _playerService.GetPlayer(playerIn.Id);
            
            if (player == null)
            {
                return NotFound();
            }

            _playerService.UpdatePlayer(playerIn);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult DeletePlayer(string id)
        {
            var player = _playerService.GetPlayer(id);

            if (player == null)
            {
                return NotFound();
            }
            
            _playerService.RemovePlayer(player.Id);
            return NoContent();
        }
    }
}