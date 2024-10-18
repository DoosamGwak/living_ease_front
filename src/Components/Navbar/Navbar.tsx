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
    location.pathname.match("/profile") ||
    location.pathname === "/aichat" ||
    location.pathname === "/"
  )
    return null;
  return (
    <>
      <div
        className={cx("navbar")}
        style={
          location.pathname.match("/board/") ||
          location.pathname.match("/support/")
            ? { background: "#fafafa" }
            : {}
        }
      >
        <Link to={"/home"}>
          <img src={logoLight} alt="로고" />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
