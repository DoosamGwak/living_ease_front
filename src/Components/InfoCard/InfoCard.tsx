import classNames from "classnames/bind";
import styles from "./InfoCard.module.css";
import { BoardListGet } from "../../Models/Board";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const InfoCard = (props: { category: string; data: BoardListGet }) => {
  const { data, category } = props;
  const navigate = useNavigate();
  return (
    <div
      className={cx("row")}
      onClick={() => navigate(`/board/${category}/${data.id.toString()}`)}
    >
      <h2>{data.title}</h2>
      <p>{data.content_snippet.slice(0, 80) + "..."}</p>
      <p>2024.10.07</p>
    </div>
  );
};

export default InfoCard;
