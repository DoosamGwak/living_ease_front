import styles from "./SupportFooter.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SupportFooter = () => {
  return (
    <>
      <div className={cx("main-content", "support")} id="support">
        <div>
          <h2>고객지원</h2>
          <p>펫밀리는 고객의 지원에 늘 최선을 다하고 있습니다.</p>
          <p>
            문의사항이 있다면 1:1문의, 전화, 이메일을
            <br />
            이용해 주세요.
          </p>
          <a className={cx("support-bt")} href="">
            문의하러 가기 {">"}
          </a>
          <div className={cx("support-bottom")}>
            <div className={cx("support-row", "support-row-left")}>
              전화 문의
              <span>02-123-4567</span>
            </div>
            <div className={cx("support-row", "support-row-right")}>
              이메일 문의
              <span>PETMILY@GAMIL.COM</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("main-content", "bottom")}>
        <div>
          <p>(주)펫밀리</p>
          <p>대표이사: 이승주 김민주 서영환 정순겸</p>
          <p>회사위치: 서울 강남구 논현로00길 100</p>
          <p>사업자번호: 123-45-12345</p>
        </div>
      </div>
    </>
  );
};

export default SupportFooter;
