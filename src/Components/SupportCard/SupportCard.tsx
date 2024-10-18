import classNames from "classnames/bind";
import styles from "./SupportCard.module.css";
import { BoardDetailGet, BoardListGet } from "../../Models/Board";
import { useState } from "react";
import { boardDetailGetAPI } from "../../Services/BoardAPI";

const cx = classNames.bind(styles);

const SupportCard = (props: { data: BoardListGet }) => {
  const { data } = props;
  const [onActive, setOnActive] = useState<boolean>(false);
  const [detail, setDetail] = useState<BoardDetailGet>();
  const onContent = () => {
    const getDetail = async (id: number) => {
      const res = await boardDetailGetAPI(id);
      console.log(res?.data);
      setDetail(res?.data);
      setOnActive(!onActive);
    };
    getDetail(data.id);
  };
  return (
    <div className={cx("row")}>
      <h2>
        {data?.title}
        <button
          className={cx("onoff-bt", `${onActive ? "active" : ""}`)}
          onClick={onContent}
        ></button>
      </h2>
      <p className={cx("date")}>2024.10.07 16:16</p>
      {onActive && detail ? (
        <p className={cx("board-content")}>{detail.content}</p>
      ) : null}
    </div>
  );
};

export default SupportCard;
