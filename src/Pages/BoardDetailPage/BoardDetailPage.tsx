import classNames from "classnames/bind";
import styles from "./BoardDetailPage.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { boardDetailGetAPI } from "../../Services/BoardAPI";
import { BoardDetailGet } from "../../Models/Board";
import moveBtn from "./asset/move_bt.png";

const cx = classNames.bind(styles);

const BoardDetailPage = () => {
  const [detail, setDetail] = useState<BoardDetailGet>();
  const { id, category } = useParams<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state.date;

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const res = await boardDetailGetAPI(parseInt(id, 10));
        setDetail(res?.data);
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
        <button className={cx("edit")}>수정</button>
        <button className={cx("delete")}>삭제</button>
      </div>
      <div className={cx("content-info")}>
        <h2>{detail?.title}</h2>
        <p>{date}</p>
      </div>
      <div className={cx("content-bottom")}>
        {detail &&
          detail.images.map((image: any) => <img src={image.image} alt="" />)}
        <br />
        {detail?.content}
      </div>
    </div>
  );
};

export default BoardDetailPage;
