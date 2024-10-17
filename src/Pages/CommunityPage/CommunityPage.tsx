import CommunityList from "../../Components/CommunityList/CommunityList";
import styles from "./CommunityPage.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CommunityPage = () => {
  return (
    <>
      <div className={cx("pet-family", "img1")}></div>
      <div className={cx("content")}>
        <CommunityList />
      </div>
    </>
  );
};

export default CommunityPage;
