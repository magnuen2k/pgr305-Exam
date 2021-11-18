import { IStaff } from "../interfaces/IStaff";
import { AxiosResponse } from "axios";

export type StaffContextType = {
  staff: IStaff[];
  getStaffById: (id: string) => IStaff;
  addStaff: (staff: IStaff) => Promise<AxiosResponse<any, any>>;
};
