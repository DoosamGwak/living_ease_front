import classNames from "classnames/bind";
import styles from "./InfoCard.module.css";
import { BoardListGet } from "../../Models/Board";

const cx = classNames.bind(styles);

const InfoCard = (props: { data: BoardListGet }) => {
  const { data } = props;
  return (
    <div className={cx("row")}>
      <h2>{data.title}</h2>
      <p>CONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENTCONTENT</p>
      <p>2024.10.07</p>
    </div>
  );
};

export default InfoCard;
