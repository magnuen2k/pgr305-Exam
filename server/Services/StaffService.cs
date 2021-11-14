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

        public Staff GetStaff(string id)
        {
            return _staff.Find<Staff>(staff => staff.Id == id).FirstOrDefault();
        }

        public Staff PostStaff(Staff newStaff)
        {
            _staff.InsertOne( newStaff );
            return newStaff;
        }

        public Staff UpdateStaff(Staff staffIn)
        {
            
            var filter = Builders<Staff>.Filter.Eq("Id", staffIn.Id);
            var update = Builders<Staff>.Update
                .Set("Name", staffIn.Name)
                .Set("Club", staffIn.Club)
                //.Set("Image", player.Image)
                .Set("Nationality", staffIn.Nationality)
                .Set("YearBorn", staffIn.YearBorn)
                .Set("Role", staffIn.Role);

            return _staff.FindOneAndUpdate(filter, update);

            //staffIn.ReplaceOne(staff => staff.Id == staffIn.Id, staffIn); + gjøre funksjonen void
        }

        public void RemoveStaff(string id)
        {
            _staff.DeleteOne(staff => staff.Id == id);
        }
    }
}