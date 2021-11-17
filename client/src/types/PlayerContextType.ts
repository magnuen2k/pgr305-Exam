import { AxiosResponse } from "axios";
import { IPlayer } from "../interfaces/IPlayer";

export type PlayerContextType = {
  players: IPlayer[];
  getPlayerById: (id: string) => IPlayer;
  addPlayer: (player: IPlayer) => Promise<AxiosResponse<any, any>>;
  editPlayer: (player: IPlayer) => Promise<AxiosResponse<any, any>>;
  deletePlayer: (id: string) => Promise<AxiosResponse<any, any>>;
};
