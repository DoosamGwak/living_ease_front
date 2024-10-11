import categoryIcon from "./asset/categoryIcon.png";
import homeIcon from "./asset/homeIcon.png";
import loginIcon from "./asset/loginIcon.png";
import searchIcon from "./asset/searchIcon.png";
import styles from "./Footer.module.css";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

const cx = classNames.bind(styles);

const Footer = () => {
  const location = useLocation();
  const { isLoggedIn, logout, user } = useAuth();
  if (location.pathname === "/aimatch") return null;
  return (
    <>
      <footer className={cx("footer")}>
        <Link to="">
          <img src={homeIcon} alt="홈 아이콘" />홈
        </Link>
        <Link to="">
          <img src={categoryIcon} alt="카테고리 아이콘" />
          카테고리
        </Link>
        <Link to="">
          <img src={searchIcon} alt="검색 아이콘" />
          검색
        </Link>
        {isLoggedIn() ? (
          <Link to="/" onClick={logout}>
            <img src={loginIcon} alt="로그아웃 아이콘" />
            {user?.nickname}
          </Link>
        ) : (
          <Link to="login">
            <img src={loginIcon} alt="로그인 아이콘" />
            로그인/가입
          </Link>
        )}
      </footer>
    </>
  );
};

export default Footer;
