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

        public Player GetPlayer(string id)
        {
            //return _players.Find<Player>(Builders<Player>.Filter.Eq("Id", id)).FirstOrDefault();
            return _players.Find<Player>(player => player.Id == id).FirstOrDefault();
        }

        public Player PostPlayer(Player newPlayer)
        {
            _players.InsertOne( newPlayer );
            return newPlayer;
        }

        public Player UpdatePlayer(Player playerIn)
        {
            
            var filter = Builders<Player>.Filter.Eq("Id", playerIn.Id);
            var update = Builders<Player>.Update
                .Set("Name", playerIn.Name)
                .Set("Club", playerIn.Club)
                //.Set("Image", player.Image)
                .Set("Nationality", playerIn.Nationality)
                .Set("YearBorn", playerIn.YearBorn)
                .Set("Position", playerIn.Position);

            return _players.FindOneAndUpdate(filter, update);

            //_players.ReplaceOne(player => player.Id == playerIn.Id, playerIn); + gjøre funksjonen void
        }

        public void RemovePlayer(string id)
        {
            _players.DeleteOne(player => player.Id == id);
        }
    }
}