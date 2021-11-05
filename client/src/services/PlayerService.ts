import axios from "axios";
import { IPlayer } from "../interfaces/IPlayer";

export const PlayerService = (function () {
  const baseUrl = "https://localhost:5001/player";

  const getPlayers = async () => {
    const res = await axios.get(baseUrl);
    return res.data as IPlayer[];
  };

  return {
    getPlayers,
  };
})();
