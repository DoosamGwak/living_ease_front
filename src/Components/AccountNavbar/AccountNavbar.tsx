import React from "react";
import backIcon from "./backIcon.png";
import styles from "./AccountNavbar.module.css";
import classNames from "classnames/bind";
import { Link, useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

type Props = {};

const AccountNavbar = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <div className={cx("navbar-container")}>
        <div className={cx("back-arrow")} onClick={onClick}>
          <img src={backIcon} alt="뒤로가기" />
        </div>
        <div className={cx("navbar")}>
          <Link
            to="/signup"
            className={cx(`${location.pathname === "/signup" ? "active" : ""}`)}
          >
            <span>회원가입</span>
          </Link>
          <Link
            to="/login"
            className={cx(`${location.pathname === "/login" ? "active" : ""}`)}
          >
            <span>로그인</span>
          </Link>
        </div>
      </div>
    );
  } else return null;
};

export default AccountNavbar;
