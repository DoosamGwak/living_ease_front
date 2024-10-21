import classNames from "classnames/bind";
import styles from "./AIRecommend.module.css";
import moveIcon from "./asset/003.png";
import dog from "./asset/goldenRetriver.jpg";
import { useEffect, useState } from "react";
import { AIRModel } from "../../Models/AIQ";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const AIRecommendPage = () => {
  const [recommend1, setRecommend1] = useState<AIRModel>();
  // const [recommend2, setRecommend2] = useState<AIRModel>();
  const navigate = useNavigate();
  useEffect(() => {
    const recommends = localStorage.getItem("aiRec");
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
          <div className={cx("pet_info")}>
            <span className={cx("pet_info", "title")}>성격</span>
            <hr />
            <div></div>
            {recommend1?.personality}
          </div>
          <div className={cx("pet_info")}>
            <span className={cx("pet_info", "title")}>추천하는 이유</span>
            {recommend1?.why}
          </div>
          <button className={cx("pet_btn")} type="button">
            분양소 정보 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendPage;
