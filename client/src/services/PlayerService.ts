import axios from "axios";
import { IPlayer } from "../interfaces/IPlayer";
import { API_URL } from "../utils/Constants";

export const PlayerService = (function () {
  const baseUrl = `${API_URL}/api/player`;

  const getPlayers = async () => {
    const res = await axios.get(baseUrl);
    return res.data as IPlayer[];
  };

  const addPlayer = async (player: IPlayer) => {
    const res = await axios.post(baseUrl, player);
    return res;
  };

  const editPlayer = async (player: IPlayer) => {
    const res = await axios.put(baseUrl, player);
    return res;
  };

  return {
    getPlayers,
    addPlayer,
    editPlayer,
  };
})();
