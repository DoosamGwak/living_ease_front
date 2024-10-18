import styles from "./CommunityCard.module.css";
import classNames from "classnames/bind";
import moveBtn from "./asset/move_bt2.png";
import profile from "./asset/info_004.png";
import { BoardListGet } from "../../Models/Board";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CommunityCard = (props: { data: BoardListGet; category: string }) => {
  const { data, category } = props;
  return (
    <div className={cx("row")}>
      <div className={cx("left-content")}>
        <img src={profile} alt="사진" />
      </div>
      <div className={cx("center-content")}>
        <p className={cx("content-category")}>{category}</p>
        <h3 className={cx("content-user")}>
          {data.nickname}
          <span className={cx("time")}>12시간전</span>
        </h3>
        <p className={cx("content-title")}>{data.title}</p>
      </div>
      <div className={cx("right-content")}>
        <Link to={""}>
          <img src={moveBtn} alt="이동" />
        </Link>
      </div>
    </div>
  );
};

export default CommunityCard;
