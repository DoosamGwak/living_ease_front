import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoDark from "./asset/logoDark.png";
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
        <Link to={""}>
          <img src={logoDark} alt="로고" />
        </Link>
      </div>

      <div className={cx("menu-bar")}>
        <NavLink
          to={""}
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          홈
        </NavLink>
        <NavLink
          to="location"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          위치서비스
        </NavLink>
        <NavLink
          to="comunity"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          커뮤니티
        </NavLink>
        <NavLink
          to="info"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          정보게시판
        </NavLink>
        <NavLink
          to="csr"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          고객지원
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
