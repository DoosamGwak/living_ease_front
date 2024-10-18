import classNames from "classnames/bind";
import styles from "./InfoBoard.module.css";
import infoTopIcon1 from "./asset/info-top-001.png";
import infoTopIcon2 from "./asset/info-top-002.png";
import infoTopIcon3 from "./asset/info-top-003.png";
import infoTopIcon4 from "./asset/info-top-004.png";
import { Link, useParams } from "react-router-dom";
import { boardListGetAPI } from "../../Services/BoardAPI";
import { useEffect, useState } from "react";
import { BoardListGet } from "../../Models/Board";
import InfoCard from "../../Components/InfoCard/InfoCard";

const cx = classNames.bind(styles);

const INFOCATEGORY = [
  {
    name: "training",
    title: "훈련법",
    context: ["PETMILY의 새로운 소식을", "알려드립니다."],
    link: "/info/training",
    image: infoTopIcon1,
  },
  {
    name: "vaccine",
    title: "예방접종",
    context: ["자주 묻는 질문에서", "궁금한 내용을 확인해 보세요.."],
    link: "/info/vaccine",
    image: infoTopIcon2,
  },
  {
    name: "healthyfood",
    title: "식단",
    context: ["PETMILY 서비스 사용법을", "쉽고 빠르게 알려드릴게요."],
    link: "/info/healthyfood",
    image: infoTopIcon3,
  },
  {
    name: "supplies",
    title: "용품",
    context: ["궁금하신 내용을 남겨주시면", "빠르게 답변 드릴게요."],
    link: "/info/supplies",
    image: infoTopIcon4,
  },
];

const InfoBoard = () => {
  const [boards, setBoards] = useState<BoardListGet[]>();
  const { categoryName } = useParams<string>();
  useEffect(() => {
    if (!!categoryName) {
      const getCategoryInit = async () => {
        const res = await boardListGetAPI("info/" + categoryName!);
        console.log(res?.data);
        setBoards(res?.data);
      };
      getCategoryInit();
    }
  }, [categoryName]);
  return (
    <>
      <div className={cx("pet-family", "img1")}></div>
      <div className={cx("content")}>
        <div className={cx("content-info")}>
          <h2>정보 게시판</h2>
          <hr />
          <p>
            전문가가 알려주는 훈련볍, 건강 관리 등 반려동물을 키우는데 필요한
            정보를 정보게시판에서 확인 할 수 있어요.
          </p>
          <div className={cx("search-bar")}>
            <input type="text" placeholder="Search.." />
            <button type="button"></button>
          </div>
          <div className={cx("content-top")}>
            {INFOCATEGORY.map((category) => (
              <div className={cx("row")} id={category.name} key={category.name}>
                <Link
                  to={category.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <img src={category.image} alt="훈련법" />
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("content-bottom")}>
          <div className={cx("content-body")} id="content1">
            {boards &&
              boards.map((board: BoardListGet) => {
                return (
                  <InfoCard
                    key={board.id}
                    data={board}
                    category={categoryName ? categoryName : ""}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBoard;
