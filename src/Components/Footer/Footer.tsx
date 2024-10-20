import styles from "./Footer.module.css";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import AIIcon from "./asset/AI_icon.png";
import CategoryModal from "../CategoryModal/CategoryModal";
import { useState } from "react";

const cx = classNames.bind(styles);

const Footer = () => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const onModal = () => {
    setActiveModal(!activeModal);
  };
  if (
    location.pathname === "/aimatch" ||
    location.pathname === "/" ||
    location.pathname.match("/profile") ||
    location.pathname === "/aichat"
  )
    return null;
  return (
    <>
      <footer className={cx("footer")}>
        <Link to="/home">홈</Link>
        <a onClick={onModal}>카테고리</a>
        <Link to="/aichat">
          <img src={AIIcon} alt="팻밀리 AI" />
          펫밀리 AI
        </Link>
        <Link to="/location">Map</Link>
        {isLoggedIn() ? (
          <Link to="/profile/detail">{user?.nickname}</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </footer>
      {activeModal ? <CategoryModal onActive={onModal} /> : null}
    </>
  );
};

export default Footer;
