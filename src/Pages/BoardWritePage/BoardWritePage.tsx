import classNames from "classnames/bind";
import styles from "./BoardWritePage.module.css";
import moveBtn from "./asset/move_bt.png";

const cx = classNames.bind(styles);

const BoardWritePage = () => {
  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <a href="">
          <img src={moveBtn} alt="" />
        </a>
        커뮤니티
      </div>
      <div className={cx("content-info")}>
        <h2>글 등록하기</h2>
      </div>
      <div className={cx("content-bottom")}>
        <form>
          <p>
            <label htmlFor="board-category">카테고리</label>
            <select name="board-category" id="board-category">
              <option>카테고리를 선택해 주세요.</option>
              <option value="walkingmate">산책 메이트</option>
              <option value="tip">꿀팁</option>
              <option value="etc">자유게시판</option>
            </select>
          </p>
          <p>
            <label htmlFor="board-title">제목</label>
            <input
              type="text"
              id="board-title"
              name="board-title"
              placeholder="30자 이내로 입력해 주세요."
            />
          </p>
          <p>
            <label htmlFor="board-content">제목</label>
            <textarea
              name="board-content"
              id="board-content"
              placeholder="내용을 입력해 주세요."
            ></textarea>
          </p>
          <p className={cx("board-files")}>
            <label htmlFor="board-picture">
              사진 첨부 <span>{"(선택)"}</span>
            </label>
            <input type="file" id="board-picture" />
          </p>
          <div className={cx("picture-body")}>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
            <div className={cx("picture-content")}>+</div>
          </div>
          <div className={cx("board-bts")}>
            <button className={cx("board-censer")}>취소</button>
            <button className={cx("board-ok")}>등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWritePage;
