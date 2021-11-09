namespace server.Interfaces
{
    public interface IStaff : IPerson
    {
        string Role { get; set; }
    }
}