using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Interfaces;

namespace server.Models
{
    public class Trophy : ITrophy
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string TournamentName { get; set; }
        public int Victories { get; set; }
        public string Image { get; set; }
    }
}