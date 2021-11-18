import { IResponse } from "../interfaces/IResponse";

export const handleError = (
  e: any,
  setIsLoading: (val: boolean) => void,
  setResponse: (val: IResponse) => void
) => {
  setIsLoading(false);
  if (e.response) {
    setResponse({
      message: e.message,
      statusCode: e.response.status,
    });
  } else {
    setResponse({
      message: "Network error",
      statusCode: 0,
    });
  }
};
