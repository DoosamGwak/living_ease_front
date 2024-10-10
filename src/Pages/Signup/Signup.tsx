import React from "react";
import styles from "./Signup.module.css";
import classNames from "classnames/bind";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);

type Props = {};

type SignupFormsInputs = {
  email: string;
  nickname: string;
  password: string;
  password2: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("이메일을 입력해주세요."),
  nickname: Yup.string().required("닉네임을 입력해주세요."),
  password: Yup.string().required("패스워드을 입력해주세요."),
  password2: Yup.string().required("패스워드을 입력해주세요."),
});

const Signup = (props: Props) => {
  const { signupUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: SignupFormsInputs) => {
    signupUser(form.email, form.nickname, form.password, form.password2);
  };
  return (
    <form className={cx("login-form")} onSubmit={handleSubmit(handleLogin)}>
      <div className={cx("login-div")}>
        <h1>회원가입</h1>
        <input type="email" placeholder="이메일" {...register("email")} />
        {errors.email ? (
          <p className={cx("password-warning")}>{errors.email.message}</p>
        ) : (
          ""
        )}
        <input type="nickname" placeholder="닉네임" {...register("nickname")} />
        {errors.nickname ? (
          <p className={cx("password-warning")}>{errors.nickname.message}</p>
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

        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          {...register("password2")}
        />
        {errors.password2 ? (
          <p className={cx("password-warning")}>{errors.password2.message}</p>
        ) : (
          ""
        )}
        <button className={cx("login-btn")} type="submit">
          회원 가입하기
        </button>
      </div>

      <div className={cx("divider")}>
        <span>또는</span>
      </div>

      <button className={cx("google-btn")} type="button">
        구글 계정으로 회원 가입하기
      </button>
    </form>
  );
};

export default Signup;
