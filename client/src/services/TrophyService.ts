import axios from "axios";
import { ITrophy } from "../interfaces/ITrophy";
import { API_URL } from "../utils";

export const TrophyService = (function () {
  const baseUrl = `${API_URL}/api/trophy`;

  const getTrophies = async () => {
    const res = await axios.get(baseUrl);
    return res.data as ITrophy[];
  };

  const addTrophies = async (trophy: ITrophy) => {
    return await axios.post(baseUrl, trophy);
  };

  const editTrophy = async (trophy: ITrophy) => {
    return await axios.put(baseUrl, trophy);
  };

  const deleteTrophy = async (id: string) => {
    return await axios.delete(`${baseUrl}/${id}`);
  };

  return {
    getTrophies,
    addTrophies,
    editTrophy,
    deleteTrophy,
  };
})();
