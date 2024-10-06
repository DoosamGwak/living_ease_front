import { Link, Outlet } from "react-router-dom";
import logo from "./logoDark.png";
import styles from "./Home.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Home() {
  return (
    <>
      <div className={cx("pet-family")}></div>

      <div className={cx("content")}>
        <div className={cx("section")}>
          <h2>위치서비스</h2>
          <p>집 근처 다양한 산책로 추천</p>
          <div className={cx("section-content")}>
            <div className={cx("section-row")}>
              <img src={logo} alt="" />
            </div>
            <div className={cx("section-row")}>
              <img src={logo} alt="" />
            </div>
            <div className={cx("section-row")}>
              <img src={logo} alt="" />
            </div>
            <div className={cx("section-row")}>
              <img src={logo} alt="" />
            </div>
            <div className={cx("section-row")}>
              <img src={logo} alt="" />
            </div>
          </div>
        </div>

        <div className={cx("section")}>
          <h2>커뮤니티</h2>
          <p>같이 산책할 친구를 찾아볼까요?</p>
        </div>

        <div className={cx("section")}>
          <h2>정보게시판</h2>
          <p>전문가가 알려주는 훈련법, 건강관리 등을 확인할 수 있어요</p>
        </div>

        <div className={cx("section")}>
          <h2>고객지원</h2>
          <p>무엇을 도와드릴까요?</p>
        </div>
      </div>
    </>
  );
}

export default Home;
