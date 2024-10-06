import React from "react";
import styles from "./Login.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {};

const Login = (props: Props) => {
  return (
    <form action="">
      <div className={cx("login-form")}>
        <h1>로그인</h1>
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <div className={cx("password-warning")}>
          ※ 8자 이상 대문자, 소문자, 숫자, 특수문자 중 3가지 이상을 사용해
          주세요.
        </div>
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
