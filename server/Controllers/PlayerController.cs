using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
    }
}