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
            _players = database.GetCollection<Player>(settings.PlayerCollectionName);
        }

        public List<Player> GetPlayers()
        {
            return _players.Find(player => true).ToList();
        }

        public Player GetPlayer(string id)
        {
            return _players.Find<Player>(player => player.Id == id).FirstOrDefault();
        }

        public Player PostPlayer(Player newPlayer)
        {
            _players.InsertOne(newPlayer);
            return newPlayer;
        }
        
        public void UpdatePlayer(Player playerIn)
        {
            _players.ReplaceOne(player => player.Id == playerIn.Id, playerIn);
        }

        public void RemovePlayer(string id)
        {
            _players.DeleteOne(player => player.Id == id);
        }
    }
}