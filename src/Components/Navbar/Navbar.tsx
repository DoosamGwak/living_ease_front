import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "./logoDark.png";
import styles from "./Navbar.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {};

const Navbar = (props: Props) => {
  const location = useLocation();
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/aimatch"
  )
    return null;
  return (
    <>
      <div className={cx("navbar")}>
        <Link to={"home"}>
          <img src={logoDark} alt="로고" />
        </Link>
      </div>

      <div className={cx("menu-bar")}>
        <Link to={"home"} className="active">
          홈
        </Link>
        <Link to="">위치서비스</Link>
        <Link to="">커뮤니티</Link>
        <Link to="">정보게시판</Link>
        <Link to="">고객지원</Link>
      </div>
    </>
  );
};

export default Navbar;
