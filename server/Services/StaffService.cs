using System;
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
            var res = new List<Staff>();
            try
            {
                res = _staff.Find(staff => true).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        public Staff GetStaff(string id)
        {
            var res = new Staff();
            try
            {
                res = _staff.Find<Staff>(staff => staff.Id == id).FirstOrDefault();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        public Staff PostStaff(Staff newStaff)
        {
            try
            {
                _staff.InsertOne(newStaff);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return newStaff;
        }

        public void UpdateStaff(Staff staffIn)
        {
            try
            {
                _staff.ReplaceOne(staff => staff.Id == staffIn.Id, staffIn);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void RemoveStaff(string id)
        {
            try
            {
                _staff.DeleteOne(staff => staff.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}