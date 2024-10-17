import { Link } from "react-router-dom";
import styles from "./CategoryModal.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type CategoryModalProp = {
  onActive: () => void;
};

const CategoryModal = (props: CategoryModalProp) => {
  return (
    <div className={cx("modal")}>
      <div className={cx("modal-content")}>
        <button className={cx("close")} onClick={props.onActive}>
          X
        </button>
        <div className={cx("modal-body")}>
          <Link to="/aichat" className={cx("modal-row")}>
            <p>반려동물 추천 서비스</p>
            <h3>팻밀리 AI</h3>
          </Link>
          <Link to="/location" className={cx("modal-row")}>
            <p>주변 산책로, 동물병원 추천</p>
            <h3>위치서비스</h3>
          </Link>
          <Link to="/community/walkingmate" className={cx("modal-row")}>
            <p>반려동물의 친구 찾아줄 서비스</p>
            <h3>커뮤니티</h3>
          </Link>
          <Link to="/info/training" className={cx("modal-row")}>
            <p>믿을 수 있는 꿀 정보 서비스</p>
            <h3>정보게시판</h3>
          </Link>
          <Link to="/" className={cx("modal-row")}>
            <p>강아지에 한 모든 정보를 담아둔 서비스</p>
            <h3>견종백과</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
