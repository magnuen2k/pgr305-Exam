using System.Collections.Generic;
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
        public Player PostPlayer(Player newPlayer)
        {
            return _playerService.PostPlayer(newPlayer);
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