import classNames from "classnames/bind";
import styles from "./IntroPage.module.css";
import logoLight from "./asset/logoLight.png";
import introLogo from "./asset/introLogo.png";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const IntroPage = () => {
  return (
    <>
      <div className={cx("top")}>
        <img src={logoLight} alt="로고" />
      </div>
      <div className={cx("intro-text-box")}>
        <h2>환영합니다.</h2>
        <h2>반려동물 매칭서비스</h2>
        <img src={introLogo} alt="로고2" />
        <h2>입니다.</h2>
      </div>
      <div className={cx("bottom")}>
        <div>
          {/* <Link to="/login" className={cx("intro-bt", "login-bt")}>
            로그인하러 가기
          </Link> */}
          <Link to="/aichat" className={cx("intro-bt", "ai-metch-bt")}>
            반려동물 매칭 AI 검사 받기
          </Link>
        </div>
      </div>
    </>
  );
};

export default IntroPage;
