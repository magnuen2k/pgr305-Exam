import axios from "axios";
import { ITrophy } from "../interfaces/ITrophy";
import { API_URL } from "../utils/Constants";

export const TrophyService = (function () {
  const baseUrl = `${API_URL}/api/trophy`;

  const getTrophies = async () => {
    const res = await axios.get(baseUrl);
    return res.data as ITrophy[];
  };

  const addTrophies = async (trophy: ITrophy) => {
    const res = await axios.post(baseUrl, trophy);
    return res;
  };

  return {
    getTrophies,
    addTrophies,
  };
})();
