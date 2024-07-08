import { Dispatch, SetStateAction, useState } from "react";

import { cookiesManager } from "../../core";
import { initializeUser, User } from "../interfaces";
import { postLogin } from "../services";

interface SignInBoxManager {
  data: User;
  setData: Dispatch<SetStateAction<User>>;
  error: boolean;
  message: string;
  onClick: () => void;
}

export const useSignInBox = (): SignInBoxManager => {
  const [data, setData] = useState<User>(initializeUser);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const onClick = () => {
    setError(false);
    postLogin(data).then((response) => {
      if (response.status === 200) {
        cookiesManager.setCookie(
          "authToken",
          response.authToken,
          data.rememberMe
        );
        setError(false);
        setMessage(response.message);
      } else {
        setError(true);
        setMessage(response.message);
      }
    });
  };

  return { data, setData, error, message, onClick };
};
