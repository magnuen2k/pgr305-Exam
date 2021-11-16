import axios from "axios";
import { IStaff } from "../interfaces/IStaff";

export const StaffService = (function () {
  const baseUrl = "https://localhost:5001/api/staff";

  const getStaff = async () => {
    const res = await axios.get(baseUrl);
    return res.data as IStaff[];
  };

  return {
    getStaff,
  };
})();
