using System;
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
            return _players.Find( player => true ).ToList();
        }

        public Player GetPlayer(string Id)
        {
            Console.WriteLine("Id = " + Id);
            return _players.Find<Player>(Builders<Player>.Filter.Eq("Id", Id)).FirstOrDefault();
        }

        public Player PostPlayer(Player newPlayer)
        {
            _players.InsertOne( newPlayer );
            return newPlayer;
        }

        public Player UpdatePlayer(Player player)
        {
            
            var filter = Builders<Player>.Filter.Eq("Id", player.Id);
            var update = Builders<Player>.Update
                .Set("Name", player.Name)
                .Set("Club", player.Club)
                //.Set("Image", player.Image)
                .Set("Nationality", player.Nationality)
                .Set("YearBorn", player.YearBorn)
                .Set("Position", player.Position);

            return _players.FindOneAndUpdate(filter, update);
            
            //return player;
        }
    }
}