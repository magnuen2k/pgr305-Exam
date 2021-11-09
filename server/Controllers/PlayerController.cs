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

        [HttpGet("{id}")]
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

        [HttpPatch]
        public Player UpdatePlayer(Player player)
        {
            return _playerService.UpdatePlayer(player);
        }
    }
}