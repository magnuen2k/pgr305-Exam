import { createContext, FC, useEffect, useState } from "react";
import { IStaff } from "../interfaces/IStaff";
import { StaffService } from "../services/StaffService";
import { StaffContextType } from "../types/StaffContextType";

export const StaffContext = createContext<StaffContextType | null>(null);

export const StaffProvider: FC = ({ children }) => {
  const [staff, setStaff] = useState<IStaff[]>([]);

  useEffect(() => {
    getStaffFromService();
  }, []);

  const getStaffFromService = async () => {
    const res = await StaffService.getStaff();
    setStaff(res);
  };

  const getStaffById = (id: string) => {
    return staff.find((s) => s.id === id) as IStaff;
  };

  const addStaff = async (staff: IStaff) => {
    return await StaffService.addStaff(staff);
  };

  return (
    <StaffContext.Provider value={{ staff, getStaffById, addStaff }}>
      {children}
    </StaffContext.Provider>
  );
};
