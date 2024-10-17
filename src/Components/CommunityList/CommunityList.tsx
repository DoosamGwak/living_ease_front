import { useEffect, useState } from "react";
import CommunityCard from "../CommunityCard/CommunityCard";
import styles from "./CommunityList.module.css";
import classNames from "classnames/bind";
import { boardListGetAPI } from "../../Services/BoardAPI";
import { Link, useParams } from "react-router-dom";
import { BoardListGet } from "../../Models/Board";

export const COMUNITYCATEGORY = [
  { name: "walkingmate", text: "산책메이트", link: "/community/walkingmate" },
  { name: "tip", text: "꿀팁 공유", link: "/community/tip" },
  { name: "etc", text: "자유게시판", link: "/community/etc" },
];

const cx = classNames.bind(styles);

const CommunityList = () => {
  const [boards, setBoards] = useState<BoardListGet[]>();
  const { categoryName } = useParams<string>();
  useEffect(() => {
    if (!!categoryName) {
      const getCategoryInit = async () => {
        const res = await boardListGetAPI("community/" + categoryName!);
        setBoards(res?.data);
      };
      getCategoryInit();
    }
  }, [categoryName]);
  return (
    <>
      <div className={cx("content-info")}>
        <h2>커뮤니티</h2>
        <hr />
        <p>
          반려동물을 사랑하는 사람들과의 소통
          <br />
          펫밀리 커뮤니티에서 반려동물의 친구를 만들어보세요.
        </p>
        <div className={cx("search-bar")}>
          <input type="text" placeholder="Search.." />
          <button type="button"></button>
        </div>
      </div>
      <div className={cx("content-bottom")}>
        <div className={cx("tabs")}>
          <ul>
            {COMUNITYCATEGORY.map((sort) => {
              return (
                <li className={cx("tab")} key={sort.name}>
                  <Link to={`${sort.link}`}>
                    <span>{sort.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={cx("content-body")} id="content1">
          <div className={cx("content-head")}>
            <a href="#" className={cx("board-wirtebt")}>
              글쓰기
            </a>
          </div>
          {boards &&
            boards.map((board: BoardListGet) => {
              return (
                <CommunityCard
                  key={board.id}
                  data={board}
                  category={categoryName ? categoryName : ""}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CommunityList;
