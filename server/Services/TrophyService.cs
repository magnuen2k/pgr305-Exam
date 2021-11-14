using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class TrophyService
    {
        private readonly IMongoCollection<Trophy> _trophies;

        public TrophyService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _trophies = database.GetCollection<Trophy>(settings.TrophyCollectionName);
        }

        public List<Trophy> GetTrophies()
        {
            return _trophies.Find(trophy => true).ToList();
        }

        public Trophy GetTrophy(string id)
        {
            return _trophies.Find<Trophy>(trophy => trophy.Id == id).FirstOrDefault();
        }

        public Trophy PostTrophy(Trophy newTrophy)
        {
            _trophies.InsertOne(newTrophy);
            return newTrophy;
        }

        public void UpdateTrophy(Trophy trophyIn)
        {
            _trophies.ReplaceOne(trophy => trophy.Id == trophyIn.Id, trophyIn);
        }

        public void RemoveTrophy(string id)
        {
            _trophies.DeleteOne(trophy => trophy.Id == id);
        }
    }
}