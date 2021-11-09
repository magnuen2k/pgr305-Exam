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
            _staff = database.GetCollection<Staff>(settings.StaffCollectionName);
        }

        public List<Staff> GetStaff()
        {
            return _staff.Find(staff => true).ToList();
        }

        public Staff PostStaff(Staff newStaff)
        {
            _staff.InsertOne( newStaff );
            return newStaff;
        }
    }
}