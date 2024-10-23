import classNames from "classnames/bind";
import styles from "./BoardDetailPage.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { boardDeleteAPI, boardDetailGetAPI } from "../../Services/BoardAPI";
import { BoardDetailGet } from "../../Models/Board";
import moveBtn from "./asset/move_bt.png";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";

const cx = classNames.bind(styles);

const BoardDetailPage = () => {
  const [detail, setDetail] = useState<BoardDetailGet>();
  const { id, category } = useParams<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state.date;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        await boardDetailGetAPI(parseInt(id, 10))
          .then((res) => {
            if (res?.status == 200) {
              setDetail(res?.data);
            } else {
              console.log(res);
              navigate("/notfound");
            }
          })
          .catch((e) => {
            toast("페이지 에러", e);
            navigate("/notfound");
          });
      };
      getDetail();
    }
  }, []);

  const onDelete = async () => {
    id &&
      (await boardDeleteAPI(parseInt(id)).then((res) => {
        if (res?.status === 204) {
          navigate(-1);
        }
      }));
  };

  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <span onClick={() => navigate(-1)}>
          <img src={moveBtn} alt="" />
        </span>
        {category}
        {user && detail?.nickname === user?.nickname ? (
          <>
            <button className={cx("edit")}>수정</button>
            <button className={cx("delete")} onClick={onDelete}>
              삭제
            </button>
          </>
        ) : null}
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
