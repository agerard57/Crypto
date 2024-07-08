import { publicAxios } from "../../core";
import { User } from "../interfaces";

const url = `${process.env?.REACT_APP_API_URL}/profile/login`;

export const postLogin = async (user: User) => {
  try {
    const response = await publicAxios.post(url, user);
    const data = await response.data;
    data.status = response.status;
    return data;
  } catch (error) {
    return [];
  }
};
