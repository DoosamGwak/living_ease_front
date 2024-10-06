import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AccountNavbar from "./Components/AccountNavbar/AccountNavbar";
import styles from "./App.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function App() {
  const location = useLocation();
  return (
    <>
      <div className={cx("container")}>
        <div
          className={cx(
            `${
              location.pathname === "/login" || location.pathname === "/signup"
                ? "account_wrap"
                : "wrapper"
            }`
          )}
        >
          <AccountNavbar />
          <Navbar />
          <Outlet />
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
