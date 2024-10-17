import classNames from "classnames/bind";
import styles from "./SupportPage.module.css";
import SupportList from "../../Components/SupportList/SupportList";

const cx = classNames.bind(styles);

const SupportPage = () => {
  return (
    <>
      <div className={cx("pet-family", "img1")}></div>
      <div className={cx("content")}>
        <div className={cx("content-info")}>
          <h2>고객지원</h2>
          <div className={cx("search-bar")}>
            <input type="text" placeholder="Search.." />
            <button type="button"></button>
          </div>
        </div>
        <SupportList />
      </div>
    </>
  );
};

export default SupportPage;
