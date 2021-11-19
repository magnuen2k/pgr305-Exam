import { AxiosResponse } from "axios";
import { ITrophy } from "../interfaces/ITrophy";

export type TrophyContextType = {
  trophies: ITrophy[];
  getTrophyById: (id: string) => ITrophy;
  addTrophy: (trophy: ITrophy) => Promise<AxiosResponse<any, any>>;
  editTrophy: (trophy: ITrophy) => Promise<AxiosResponse<any, any>>;
  deleteTrophy: (id: string) => Promise<AxiosResponse<any, any>>;
};
