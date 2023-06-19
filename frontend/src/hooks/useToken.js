import { useState } from "react";
import { getToken } from "../utils";

export function useToken() {
  // Save the token json response from api to localStorage
  // Save the token to state
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return [token, saveToken];
}
