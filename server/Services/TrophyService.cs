using System;
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
            var res = new List<Trophy>();
            try
            {
                res = _trophies.Find(trophy => true).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        public Trophy GetTrophy(string id)
        {
            var res = new Trophy();
            try
            {
                res = _trophies.Find<Trophy>(trophy => trophy.Id == id).FirstOrDefault();
            } catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        public Trophy PostTrophy(Trophy newTrophy)
        {
            try
            {
                _trophies.InsertOne(newTrophy);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            return newTrophy;
        }

        public void UpdateTrophy(Trophy trophyIn)
        {

            try
            {
                _trophies.ReplaceOne(trophy => trophy.Id == trophyIn.Id, trophyIn);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void RemoveTrophy(string id)
        {
            try
            {
                _trophies.DeleteOne(trophy => trophy.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}