namespace server.Interfaces
{
    public interface IPlayer : IPerson
    {
        string Position { get; set; }
    }
}