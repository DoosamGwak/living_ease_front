import styles from "./CommunityCard.module.css";
import classNames from "classnames/bind";
import moveBtn from "./asset/move_bt2.png";
import profile from "./asset/info_004.png";
import { BoardListGet } from "../../Models/Board";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

const cx = classNames.bind(styles);

const CommunityCard = (props: { data: BoardListGet; category: string }) => {
  const { data, category } = props;
  const startDate = new Date(data.created_at);
  const formatDate = moment(startDate, "YYYYMMDD").fromNow();
  return (
    <div className={cx("row")}>
      <div className={cx("left-content")}>
        <img
          src={data.profile_image ? data.profile_image : profile}
          alt="사진"
        />
      </div>
      <div className={cx("center-content")}>
        <p className={cx("content-category")}>{category}</p>
        <h3 className={cx("content-user")}>
          {data.nickname}
          <span className={cx("time")}>{formatDate}</span>
        </h3>
        <p className={cx("content-title")}>{data.title}</p>
      </div>
      <div className={cx("right-content")}>
        <Link to={`/board/${category}/${data.id}`} state={{ date: formatDate }}>
          <img src={moveBtn} alt="이동" />
        </Link>
      </div>
    </div>
  );
};

export default CommunityCard;
