import { createContext, FC, useCallback, useEffect, useState } from "react";
import { IPlayer } from "../interfaces/IPlayer";
import { PlayerService } from "../services/PlayerService";
import { PlayerContextType } from "../types/PlayerContextType";

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: FC = ({ children }) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  const getPlayersFromService = async () => {
    const res = await PlayerService.getPlayers();
    setPlayers(res);
  };

  const getPlayerById = (id: string) => {
    return players.find((p) => p.id === id) as IPlayer;
  };

  const addPlayer = async (player: IPlayer) => {
    return await PlayerService.addPlayer(player);
  };

  const editPlayer = async (player: IPlayer) => {
    return await PlayerService.editPlayer(player);
  };

  // GET players when adding or updating a player
  useEffect(() => {
    getPlayersFromService();
  }, []);

  const deletePlayer = async (id: string) => {
    let res = await PlayerService.deletePlayer(id);

    // Delete from context state aswell to avoid reload
    if (res.status === 204) {
      setPlayers(players.filter((p) => p.id !== id));
    }

    return res;
  };

  return (
    <PlayerContext.Provider
      value={{ players, getPlayerById, addPlayer, editPlayer, deletePlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
