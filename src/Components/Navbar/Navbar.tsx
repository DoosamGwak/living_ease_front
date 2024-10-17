import { Link, useLocation } from "react-router-dom";
import logoLight from "./asset/logoLight.png";
import styles from "./Navbar.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Navbar = () => {
  const location = useLocation();
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/aimatch" ||
    location.pathname === "/profile" ||
    location.pathname === "/profile/edit" ||
    location.pathname === "/aichat" ||
    location.pathname === "/"
  )
    return null;
  return (
    <>
      <div className={cx("navbar")}>
        <Link to={"/home"}>
          <img src={logoLight} alt="로고" />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
