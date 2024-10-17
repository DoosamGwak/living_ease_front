import classNames from "classnames/bind";
import styles from "./AIRecommend.module.css";
import { useAIRec } from "../../Context/useAI";
import moveIcon from "./asset/003.png";
import dog from "./asset/goldenRetriver.jpg";

const cx = classNames.bind(styles);

const AIRecommendPage = () => {
  const { recommend1 } = useAIRec();

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
