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
            var res = new List<Player>();
            try
            {
                res = _players.Find(player => true).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return res;
        }

        public Player GetPlayer(string id)
        {
            var res = new Player();
            try
            {
                res = _players.Find<Player>(player => player.Id == id).FirstOrDefault();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }

            return res;
        }

        public Player PostPlayer(Player newPlayer)
        {
            try
            {
                _players.InsertOne(newPlayer);
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
            
            return newPlayer;
        }
        
        public void UpdatePlayer(Player playerIn)
        {
            try
            {
                _players.ReplaceOne(player => player.Id == playerIn.Id, playerIn);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void RemovePlayer(string id)
        {
            try
            {
                _players.DeleteOne(player => player.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}