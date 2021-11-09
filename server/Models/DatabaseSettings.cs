namespace server.Models
{
    public interface IDatabaseSettings
    {
        string PlayerCollectionName { get; set; }
        string StaffCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class DatabaseSettings : IDatabaseSettings
    {
        public string PlayerCollectionName { get; set; }
        public string StaffCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}