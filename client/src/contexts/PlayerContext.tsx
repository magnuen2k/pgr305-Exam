import { createContext, FC, useEffect, useState } from "react";
import { IPlayer } from "../interfaces/IPlayer";
import { PlayerService } from "../services/PlayerService";
import { PlayerContextType } from "../types/PlayerContextType";

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: FC = ({ children }) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    getPlayersFromService();
  }, []);

  const getPlayersFromService = async () => {
    const res = await PlayerService.getPlayers();
    setPlayers(res);
  };

  const getPlayerById = (id: string) => {
    return players.find((p) => p.id === id) as IPlayer;
  };

  const addPlayer = async (player: IPlayer) => {
    return PlayerService.addPlayer(player);
  };

  return (
    <PlayerContext.Provider value={{ players, getPlayerById, addPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
