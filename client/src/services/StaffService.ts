import axios from "axios";
import { IStaff } from "../interfaces/IStaff";
import { API_URL } from "../utils";

export const StaffService = (function () {
  const baseUrl = `${API_URL}/api/staff`;

  const getStaff = async () => {
    const res = await axios.get(baseUrl);
    return res.data as IStaff[];
  };

  const addStaff = async (staff: IStaff) => {
    return await axios.post(baseUrl, staff);
  };

  const editStaff = async (staff: IStaff) => {
    return await axios.put(baseUrl, staff);
  };

  const deleteStaff = async (id: string) => {
    return await axios.delete(`${baseUrl}/${id}`);
  };

  return {
    getStaff,
    addStaff,
    deleteStaff,
    editStaff,
  };
})();
