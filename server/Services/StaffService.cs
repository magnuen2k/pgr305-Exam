using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class StaffService
    {
        private readonly IMongoCollection<Staff> _staff;

        public StaffService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _staff = database.GetCollection<Staff>(settings.CollectionName);
        }

        public List<Staff> GetStaff()
        {
            return _staff.Find(staff => true).ToList();
        }
    }
}