import { IStaff } from "../interfaces/IStaff";

export type StaffContextType = {
  staff: IStaff[];
  getStaffById: (id: string) => IStaff;
  addStaff: (staff: IStaff) => void;
};
