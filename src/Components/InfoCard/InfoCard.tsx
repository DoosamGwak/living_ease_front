import classNames from "classnames/bind";
import styles from "./InfoCard.module.css";
import { BoardListGet } from "../../Models/Board";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles);

const InfoCard = (props: { category: string; data: BoardListGet }) => {
  const { data, category } = props;
  const navigate = useNavigate();
  const startDate = new Date(data.created_at);
  const formatDate = moment(startDate).format("ll");
  return (
    <div
      className={cx("row")}
      onClick={() =>
        navigate(`/board/${category}/${data.id.toString()}`, {
          state: { date: formatDate },
        })
      }
    >
      <h2>{data.title}</h2>
      <p>{data.content_snippet.slice(0, 80) + "..."}</p>
      <p>{formatDate}</p>
    </div>
  );
};

export default InfoCard;
