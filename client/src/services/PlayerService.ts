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
    return await axios.post(baseUrl, player);
  };

  const editPlayer = async (player: IPlayer) => {
    return await axios.put(baseUrl, player);
  };

  const deletePlayer = async (id: string) => {
    return await axios.delete(`${baseUrl}/${id}`);
  };

  return {
    getPlayers,
    addPlayer,
    editPlayer,
    deletePlayer,
  };
})();
