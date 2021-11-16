import axios from "axios";
import { IPlayer } from "../interfaces/IPlayer";

export const PlayerService = (function () {
  const baseUrl = "https://localhost:5001/api/player";

  const getPlayers = async () => {
    const res = await axios.get(baseUrl);
    return res.data as IPlayer[];
  };

  const addPlayer = async (player: IPlayer) => {
    const res = await axios.post(baseUrl, player);
    return res;
  };

  return {
    getPlayers,
    addPlayer,
  };
})();
