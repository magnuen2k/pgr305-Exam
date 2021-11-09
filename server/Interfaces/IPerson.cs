namespace server.Interfaces
{
    public interface IPerson
    {
        string Id { get; set; }
        string Name { get; set; }
        string Club { get; set; }
        string Image { get; set; }
        string Nationality { get; set; }
        int YearBorn { get; set; }
    }
}