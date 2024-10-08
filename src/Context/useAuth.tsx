import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, signupAPI } from "../Services/AuthAPI";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  access: string | null;
  refresh: string | null;
  signupUser: (
    email: string,
    nickname: string,
    password: string,
    password2: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("access");
    if (user && access && refresh) {
      setUser(JSON.parse(user));
      setAccess(access);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access;
    }
    setIsReady(true);
  }, []);

  const signupUser = async (
    email: string,
    nickname: string,
    password: string,
    password2: string
  ) => {
    await signupAPI(email, nickname, password, password2)
      .then((res) => {
        if (res) {
          localStorage.setItem("access", res?.data.access);
          const userObj = {
            nickname: res?.data.nickname,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setAccess(res?.data.access!);
          setRefresh(res?.data.refresh!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("access", res?.data.access);
          localStorage.setItem("refresh", res?.data.refresh);
          const userObj = {
            nickname: res?.data.nickname,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setAccess(res?.data.access!);
          setRefresh(res?.data.refresh!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    setAccess("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        access,
        refresh,
        logout,
        isLoggedIn,
        signupUser,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
