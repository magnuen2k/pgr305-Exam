using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Interfaces;

namespace server.Models
{
    public class Player : IPlayer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Club { get; set; }
    }
}