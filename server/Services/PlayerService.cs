using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class PlayerService
    {
        private readonly IMongoCollection<Player> _players;

        public PlayerService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _players = database.GetCollection<Player>(settings.CollectionName);
        }

        public List<Player> GetPlayers()
        {
            return _players.Find( player => true ).ToList();
        }
    }
}