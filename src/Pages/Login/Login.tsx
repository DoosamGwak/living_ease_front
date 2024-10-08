import React from "react";
import styles from "./Login.module.css";
import classNames from "classnames/bind";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);

type Props = {};

type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("이메일을 입력해주세요."),
  password: Yup.string().required("패스워드을 입력해주세요."),
});

const Login = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.email, form.password);
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className={cx("login-form")}>
        <h1>로그인</h1>
        <input type="email" placeholder="이메일" {...register("email")} />
        {errors.email ? (
          <p className={cx("password-warning")}>{errors.email.message}</p>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        {errors.password ? (
          <p className={cx("password-warning")}>{errors.password.message}</p>
        ) : (
          <div className={cx("password-warning")}>
            ※ 8자 이상 대문자, 소문자, 숫자, 특수문자 중 3가지 이상을 사용해
            주세요.
          </div>
        )}
      </div>

      <div className={cx("btn-container")}>
        <button className={cx("login-btn")} type="submit">
          로그인하기
        </button>
        <div className={cx("divider")}>
          <span>또는</span>
        </div>
        <button className={cx("google-btn")} type="button">
          구글 계정으로 로그인하기
        </button>
      </div>
    </form>
  );
};

export default Login;
