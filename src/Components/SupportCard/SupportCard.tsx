import classNames from "classnames/bind";
import styles from "./SupportCard.module.css";
import { BoardDetailGet, BoardListGet } from "../../Models/Board";
import { useState } from "react";
import { boardDetailGetAPI } from "../../Services/BoardAPI";
import moment from "moment";

const cx = classNames.bind(styles);

const SupportCard = (props: { data: BoardListGet }) => {
  const { data } = props;
  const [onActive, setOnActive] = useState<boolean>(false);
  const [detail, setDetail] = useState<BoardDetailGet>();
  const onContent = () => {
    const getDetail = async (id: number) => {
      const res = await boardDetailGetAPI(id);
      setDetail(res?.data);
      setOnActive(!onActive);
    };
    getDetail(data.id);
  };
  const startDate = new Date(data.created_at);
  const formatDate = moment(startDate).format("lll");
  return (
    <div className={cx("row")}>
      <h2>
        {data?.title}
        <button
          className={cx("onoff-bt", `${onActive ? "active" : ""}`)}
          onClick={onContent}
        ></button>
      </h2>
      <p className={cx("date")}>{formatDate}</p>
      {onActive && detail ? (
        <p className={cx("board-content")}>{detail.content}</p>
      ) : null}
    </div>
  );
};

export default SupportCard;
