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

  const getPlayerById = async (id: string) => {
    console.log("get a player by id: " + id);
  };

  return (
    <PlayerContext.Provider value={{ players }}>
      {children}
    </PlayerContext.Provider>
  );
};
