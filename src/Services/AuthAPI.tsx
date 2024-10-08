import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { api } from "./ApiURL";

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/accounts/login/", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const signupAPI = async (
  email: string,
  nickname: string,
  password: string,
  password2: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/accounts/signup/", {
      email: email,
      nickname: nickname,
      password: password,
      password2: password2,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
