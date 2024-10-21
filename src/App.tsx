import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AccountNavbar from "./Components/AccountNavbar/AccountNavbar";
import styles from "./App.module.css";
import classNames from "classnames/bind";
import { UserProvider } from "./Context/useAuth";
import ScrollToTop from "./Helpers/ScollToTop";

const cx = classNames.bind(styles);

function App() {
  const location = useLocation();
  return (
    <>
      <UserProvider>
        <ScrollToTop />
        <div className={cx("container")}>
          <div
            className={cx(
              `${
                location.pathname === "/login" ||
                location.pathname === "/signup"
                  ? "account_wrap"
                  : location.pathname === "/aichat"
                  ? "aichatWrap"
                  : "wrapper"
              }`
            )}
            style={
              location.pathname.match("/profile") ||
              location.pathname.match("/board/") ||
              location.pathname.match("/support/")
                ? { background: "#fafafa" }
                : {}
            }
          >
            <AccountNavbar />
            <Navbar />
            <Outlet />
            <ToastContainer />
          </div>
        </div>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
