import styles from "./Footer.module.css";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import AIIcon from "./asset/AI_icon.png";
import profileIcon from "./asset/profile.png";
import mapIcon from "./asset/map.png";
import homeIcon from "./asset/home.png";
import categoryIcon from "./asset/category.png";
import CategoryModal from "../CategoryModal/CategoryModal";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const Footer = () => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const onModal = () => {
    setActiveModal(!activeModal);
  };
  useEffect(() => {
    setActiveModal(false);
  }, [location.pathname]);
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
        <Link to="/home">
          <img className={cx("icon")} src={homeIcon} alt="팻밀리 AI" />홈
        </Link>
        <span onClick={onModal}>
          <img className={cx("icon")} src={categoryIcon} alt="팻밀리 AI" />
          카테고리
        </span>
        <Link to="/aichat">
          <img className={cx("chat")} src={AIIcon} alt="팻밀리 AI" />
          펫밀리 AI
        </Link>
        <Link to="/location">
          <img className={cx("icon")} src={mapIcon} alt="팻밀리 AI" />
          Map
        </Link>
        {isLoggedIn() ? (
          <Link className={cx("profile")} to="/profile/detail">
            <img className={cx("icon")} src={profileIcon} alt="팻밀리 AI" />
            {user?.nickname}
          </Link>
        ) : (
          <Link to="/login">
            <img className={cx("icon")} src={profileIcon} alt="팻밀리 AI" />
            로그인
          </Link>
        )}
      </footer>
      {activeModal ? <CategoryModal onActive={onModal} /> : null}
    </>
  );
};

export default Footer;
