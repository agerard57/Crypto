import { Dispatch, SetStateAction, useState } from "react";

import { initializeUser, User } from "../interfaces";
import { postRegister } from "../services";

interface SignInBoxManager {
  data: Omit<User, "rememberMe">;
  setData: Dispatch<SetStateAction<Omit<User, "rememberMe">>>;
  error: boolean;
  message: string;
  onClick: () => void;
}

export const useSignUpBox = (): SignInBoxManager => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rememberMe, ...rest } = initializeUser;

  const [data, setData] = useState<Omit<User, "rememberMe">>(rest);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const onClick = () => {
    setError(false);
    postRegister(data).then((response) => {
      if (response.status === 200) {
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
