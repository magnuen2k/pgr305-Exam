import { createContext, FC, useEffect, useState } from "react";
import { ITrophy } from "../interfaces/ITrophy";
import { TrophyService } from "../services/TrophyService";
import { TrophyContextType } from "../types/TrophyContextType";

export const TrophyContext = createContext<TrophyContextType | null>(null);

export const TrophyProvider: FC = ({ children }) => {
  const [trophies, setTrophies] = useState<ITrophy[]>([]);

  useEffect(() => {
    getTrophiesFromService();
  }, []);

  const getTrophiesFromService = async () => {
    const res = await TrophyService.getTrophies();
    setTrophies(res);
  };

  const getTrophyById = (id: string) => {
    return trophies.find((t) => t.id === id) as ITrophy;
  };

  const addTrophy = async (trophy: ITrophy) => {
    return await TrophyService.addTrophies(trophy);
  };

  return (
    <TrophyContext.Provider value={{ trophies, getTrophyById, addTrophy }}>
      {children}
    </TrophyContext.Provider>
  );
};
