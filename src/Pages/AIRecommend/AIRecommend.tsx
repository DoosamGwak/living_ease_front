import classNames from "classnames/bind";
import styles from "./AIRecommend.module.css";
import moveIcon from "./asset/right_icon.png";
import dog from "./asset/sichu.png";
import { useEffect, useState } from "react";
import { AIRModel } from "../../Models/AIQ";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const AIRecommendPage = () => {
  const [recommend1, setRecommend1] = useState<AIRModel>();
  // const [recommend2, setRecommend2] = useState<AIRModel>();
  const navigate = useNavigate();
  useEffect(() => {
    const recommends = sessionStorage.getItem("aiRec");
    if (recommends) {
      const recArr = JSON.parse(recommends);
      setRecommend1(recArr[0]);
      // setRecommend2(recArr[1]);
    } else {
      navigate("/aichat");
    }
  }, []);
  return (
    <div className={cx("content")}>
      <div className={cx("section")}>
        <h2>{recommend1?.name}</h2>
        <img className={cx("dog_image")} src={dog} alt="" />
        <img className={cx("move_btn")} src={moveIcon} alt=""></img>
      </div>
      <div className={cx("pet_infos")}>
        <div className={cx("pet_line")}>
          <div className={cx("pet_info")}> {recommend1?.personality}</div>
          <div className={cx("pet_info")}>{recommend1?.why}</div>
          <button className={cx("pet_btn")} type="button">
            분양소 정보 보기
          </button>
        </div>
      </div>
      <div className={cx("pet_detail_recommend")} style={{ display: "none" }}>
        <div>
          <hr />
          <h2>분양소 정보</h2>
          <div className={cx("detail_body")}>
            <div className={cx("detail_row")}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIRecommendPage;
