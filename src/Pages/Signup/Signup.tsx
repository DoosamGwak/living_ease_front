import React from "react";
import styles from "./Signup.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
type Props = {};

const Signup = (props: Props) => {
  return (
    <form action="">
      <div className={cx("login-form")}>
        <h1>회원가입</h1>
        <input type="name" placeholder="이름" required />
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <input
          type="password2"
          placeholder="비밀번호를 다시 입력해주세요"
          required
        />
        <div className={cx("password-warning")}>
          ※ 8자 이상 대문자, 소문자, 숫자, 특수문자 중 3가지 이상을 사용해
          주세요.
        </div>
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
