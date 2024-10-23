import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, logoutAPI, signupAPI } from "../Services/AuthAPI";
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
    const user = sessionStorage.getItem("user");
    const access = sessionStorage.getItem("access");
    const refresh = sessionStorage.getItem("refresh");
    if (user && access && refresh) {
      setUser(JSON.parse(user));
      setAccess(access);
      setAccess(refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
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
        if (res?.status === 201) {
          const userObj = {
            pk: res?.data.pk,
            nickname: res?.data.nickname,
            email: res?.data.email,
          };

          axios.defaults.headers.common["Authorization"] = `Bearer ${res?.data
            .access!}`;
          sessionStorage.setItem("user", JSON.stringify(userObj));
          sessionStorage.setItem("access", res?.data.access);
          sessionStorage.setItem("refresh", res?.data.refresh);
          setAccess(res?.data.access!);
          setRefresh(res?.data.refresh!);
          setUser(userObj!);
          toast.success("로그인 완료");
          navigate("/");
        } else {
          toast.error("로그인 실패");
          navigate("/signup");
        }
      })
      .catch((e) => {
        toast.warning("Server error occured", e);
      });
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res && res?.status == 200) {
          sessionStorage.setItem("access", res?.data.access);
          sessionStorage.setItem("refresh", res?.data.refresh);
          const userObj = {
            pk: res?.data.pk,
            nickname: res?.data.nickname,
            email: res?.data.email,
          };
          sessionStorage.setItem("user", JSON.stringify(userObj));
          axios.defaults.headers.common["Authorization"] = `Bearer ${res?.data
            .access!}`;
          setAccess(res?.data.access!);
          setRefresh(res?.data.refresh!);
          setUser(userObj!);
          toast.success("로그인 완료");
          navigate("/");
        } else {
          toast.error("로그인에 실패하셨습니다.");
          navigate("/login");
        }
      })
      .catch((e) => {
        toast.warning("Server error occured", e);
        navigate("/login");
      });
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async () => {
    const refresh_token = sessionStorage.getItem("refresh");
    setRefresh(refresh_token);
    refresh &&
      (await logoutAPI(refresh)
        .then((res) => {
          if (res?.status === 200) {
            axios.defaults.headers.delete;
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("refresh");
            sessionStorage.removeItem("user");
            setUser(null);
            setAccess(null);
            setRefresh(null);
          }
        })
        .then(() => navigate("/login"))
        .catch((e) => toast.warning("로그아웃에 실패했습니다.", e)));
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
