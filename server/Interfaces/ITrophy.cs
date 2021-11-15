using System.Collections.Generic;

namespace server.Interfaces
{
    public interface ITrophy
    {
        string Id { get; set; }
        string TournamentName { get; set; }
        List<int> YearsWon { get; set; }
        string Image { get; set; }
    }
}