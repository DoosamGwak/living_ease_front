import React from "react";
import categoryIcon from "./categoryIcon.png";
import homeIcon from "./homeIcon.png";
import loginIcon from "./loginIcon.png";
import searchIcon from "./searchIcon.png";

import styles from "./Footer.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className={cx("footer")}>
        <a href="home.html">
          <img src={homeIcon} alt="홈 아이콘" />홈
        </a>
        <a href="category.html">
          <img src={categoryIcon} alt="카테고리 아이콘" />
          카테고리
        </a>
        <a href="search.html">
          <img src={searchIcon} alt="검색 아이콘" />
          검색
        </a>
        <a href="login.html">
          <img src={loginIcon} alt="로그인 아이콘" />
          로그인/가입
        </a>
      </footer>
    </>
  );
};

export default Footer;
