import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { api } from "./ApiURL";
import { redirect } from "react-router-dom";

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

export const logoutAPI = async (refresh: string) => {
  try {
    console.log(refresh);
    const res = await axios.post(api + "/accounts/logout/", {
      refresh: refresh,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getProfileAPI = async (nickname: string) => {
  try {
    console.log(nickname);
    const res = await axios.get(api + `/accounts/${nickname}`);
    console.log(res);
    return res;
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};

// google social-login
export const handleGoogleCallback = async ({ request }: any) => {
  // Exchange callback's code for JWT tokens

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/google/",
        JSON.stringify({ code }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      return redirect("/");
    } catch (err) {
      console.error(err);
      throw new Response("Bad request", { status: 400 });
    }
  }

  throw new Response("Not Found", { status: 404 });
};
