namespace server.Interfaces
{
    public interface ITrophy
    {
        string Id { get; set; }
        string TournamentName { get; set; }
        int Victories { get; set; }
        string Image { get; set; }
    }
}