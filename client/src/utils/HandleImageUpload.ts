import axios from "axios";
import { IResponse } from "../interfaces/IResponse";
import { API_URL } from "./Constants";
import { handleError } from "./HandleError";

// Do image uploading and return status code
export const handleImageUpload = async (
  file: File,
  setIsLoading: (val: boolean) => void,
  setResponse: (val: IResponse) => void
) => {
  let data = new FormData();
  data.append("file", file);
  let res;

  try {
    setIsLoading(true);
    res = await axios({
      method: "POST",
      url: `${API_URL}/ImageUpload/SaveImage`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e: any) {
    handleError(e, setIsLoading, setResponse);
  }

  return res?.status;
};
