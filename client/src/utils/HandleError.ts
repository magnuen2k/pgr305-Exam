import { IResponse } from "../interfaces/IResponse";

// Sets response message and updates loading state
export const handleError = (
  e: any,
  setIsLoading: (val: boolean) => void,
  setResponse: (val: IResponse) => void
) => {
  setIsLoading(false);
  // If response exists, set response state to content given by error. Else assume 'Network error'
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
