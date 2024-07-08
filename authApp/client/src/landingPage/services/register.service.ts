import { publicAxios } from "../../core";
import { User } from "../interfaces";

const url = `${process.env?.REACT_APP_API_URL}/profile/register`;

export const postRegister = async (formData: Omit<User, "rememberMe">) => {
  try {
    const response = await publicAxios.post(url, formData);

    const data = await response.data;
    data.status = response.status;
    return data;
  } catch (error) {
    return [];
  }
};
