import classNames from "classnames/bind";
import styles from "./BoardDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { boardDetailGetAPI } from "../../Services/BoardAPI";
import { BoardDetailGet } from "../../Models/Board";
import moveBtn from "./asset/move_bt.png";

const cx = classNames.bind(styles);

const BoardDetailPage = () => {
  const [detail, setDetail] = useState<BoardDetailGet>();
  const { id, category } = useParams<string>();
  console.log(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const res = await boardDetailGetAPI(parseInt(id, 10));
        setDetail(res?.data);
        console.log(detail);
      };
      getDetail();
    }
  }, []);
  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <span onClick={() => navigate(-1)}>
          <img src={moveBtn} alt="" />
        </span>
        {category}
      </div>
      <div className={cx("content-info")}>
        <h2>{detail?.title}</h2>
        <p>2024.10.11</p>
      </div>
      <div className={cx("content-bottom")}>{detail?.content}</div>
    </div>
  );
};

export default BoardDetailPage;
