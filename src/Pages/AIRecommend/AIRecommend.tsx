import React from "react";
import classNames from "classnames";
import styles from "./AIRecommend.module.css";

const cx = classNames.bind(styles);

type Props = {};

const AIRecommend = (props: Props) => {
  const recommendObj: any = localStorage.getItem("");
  return (
    <div className={cx("content")}>
      <div className={cx("section")}>
        <h2>당신에게 추천하는 견종은?</h2>
        <img src="../static/css/골든_리트리버.jpg" alt="" />
      </div>
      <div className={cx("pet_infos")}>
        <p>추천</p>
        <h3>골든 리트리버</h3>
        <div className={cx("pet_info")}>
          <span className={cx("title")}>성격</span>
          <hr />
          <div></div>
          골든 리트리버는 OOOO OOOOOOOO OOOOOOO OOOO OOOOOO OOOOO OOOOOOOO OOOOO
        </div>
        <div className={cx("pet_info")}>
          <span className={cx("title")}>추천하는 이유</span>
          <hr />
          골든 리트리버는 OOOOOOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOO
        </div>
        <button className={cx("pet_btn")} type="button">
          분양소 정보 보기
        </button>
      </div>
    </div>
  );
};

export default AIRecommend;
