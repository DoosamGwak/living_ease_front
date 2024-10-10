import React from "react";
import classNames from "classnames/bind";
import styles from "./InfoBoard.module.css";
import infoTopIcon1 from "./asset/info-top-001.png";
import infoTopIcon2 from "./asset/info-top-002.png";
import infoTopIcon3 from "./asset/info-top-003.png";
import infoTopIcon4 from "./asset/info-top-004.png";

const cx = classNames.bind(styles);

type Props = {};

const InfoBoard = (props: Props) => {
  return (
    <>
      <div className={cx("pet-family", "img1")}></div>
      <div className={cx("content")}>
        <div className={cx("content-info")}>
          <h2>정보 게시판</h2>
          <hr />
          <p>
            전문가가 알려주는 훈련볍, 건강 관리 등 반려동물을 키우는데 필요한
            정보를 정보게시판에서 확인 할 수 있어요.
          </p>
          <div className={cx("search-bar")}>
            <input type="text" placeholder="Search.." />
            <button type="button"></button>
          </div>
          <div className={cx("content-top")}>
            <div className={cx("row")} onClick={(e) => {}}>
              <img src={infoTopIcon1} alt="훈련법" />
              훈련법
            </div>
            <div className={cx("row")} onClick={(e) => {}}>
              <img src={infoTopIcon2} alt="예방접종" />
              예방접종
            </div>
            <div className={cx("row")} onClick={(e) => {}}>
              <img src={infoTopIcon3} alt="식단" />
              식단
            </div>
            <div className={cx("row")} onClick={(e) => {}}>
              <img src={infoTopIcon4} alt="용품" />
              용품
            </div>
          </div>
        </div>
        <div className={cx("content-bottom")}>
          <select className={cx("change-content")} id="change-content">
            <option value="1">훈련법</option>
            <option value="2">예방접종</option>
            <option value="3">식단</option>
            <option value="4">용품</option>
          </select>
          <div className={cx("content-body", "content1")} id="content1">
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
          </div>
          <div className={cx("content-body", "content2")} id="content2">
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
          </div>
          <div className={cx("content-body", "content3")} id="content3">
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
          </div>
          <div className={cx("content-body", "content4")} id="content4">
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
            <div className={cx("row")}>
              <h2>TITLE</h2>
              <p>
                CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
              </p>
              <p>2024.10.07</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBoard;
