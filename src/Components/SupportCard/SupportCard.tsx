import classNames from "classnames/bind";
import styles from "./SupportCard.module.css";
import { BoardListGet } from "../../Models/Board";

const cx = classNames.bind(styles);

const SupportCard = (props: { data: BoardListGet }) => {
  const { data } = props;
  return (
    <div className={cx("row")}>
      <h2>
        {data?.title}
        <button className={cx("onoff-bt")} id="board-bt1"></button>
      </h2>
      <p className={cx("date")}>2024.10.07 16:16</p>
      <p className={cx("board-content")} id="board1">
        CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT
      </p>
    </div>
  );
};

export default SupportCard;
