using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Interfaces;

namespace server.Models
{
    public class Staff : IStaff
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Club { get; set; }
        public string Image { get; set; }
        public string Nationality { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime DateOfBirth { get; set; }
        public string Role { get; set; }
    }
}