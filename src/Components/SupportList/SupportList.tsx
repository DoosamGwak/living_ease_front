import classNames from "classnames/bind";
import styles from "./SupportList.module.css";
import { useEffect, useState } from "react";
import { boardListGetAPI } from "../../Services/BoardAPI";
import { Link, useParams } from "react-router-dom";
import { BoardListGet } from "../../Models/Board";
import SupportCard from "../SupportCard/SupportCard";

const cx = classNames.bind(styles);

const SUPPORTCATEGORY = [
  {
    name: "notice",
    title: "공시사항",
    context: ["PETMILY의 새로운 소식을", "알려드립니다."],
    link: "/support/notice",
  },
  {
    name: "faq",
    title: "공통FAQ",
    context: ["자주 묻는 질문에서", "궁금한 내용을 확인해 보세요.."],
    link: "/support/faq",
  },
  {
    name: "howtouse",
    title: "홈페이지\n이용방법",
    context: ["PETMILY 서비스 사용법을", "쉽고 빠르게 알려드릴게요."],
    link: "/support/howtouse",
  },
  {
    name: "directmsg",
    title: "1:1 문의",
    context: ["궁금하신 내용을 남겨주시면", "빠르게 답변 드릴게요."],
    link: "/support/directmsg",
  },
];

const SupportList = () => {
  const [boards, setBoards] = useState<BoardListGet[]>();
  const { categoryName } = useParams<string>();
  useEffect(() => {
    if (!!categoryName) {
      const getCategoryInit = async () => {
        const res = await boardListGetAPI("customer_service/" + categoryName!);
        setBoards(res?.data);
      };
      getCategoryInit();
    }
  }, [categoryName]);
  return (
    <>
      <div className={cx("content-bottom")}>
        <div className={cx("tabs")}>
          <ul>
            {SUPPORTCATEGORY.map((category) => (
              <li className={cx("tab")} key={category.title}>
                <Link to={category.link}>
                  <span>{category.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={cx("content-body", "active")} id="content1">
          {SUPPORTCATEGORY.map((category, idx) =>
            category.name === categoryName ? (
              <>
                <h3 key={category.name + `${idx}`}>
                  {category.context[0]}
                  <br />
                  {category.context[1]}
                </h3>
                {categoryName === "directmsg" ? (
                  <a href="#" className={cx("board-wirtebt")}>
                    1:1 문의하기
                  </a>
                ) : null}
              </>
            ) : null
          )}
          <div className={cx("row")}>
            <span className={cx("head")}>전체 {boards?.length}</span>
          </div>
          {boards &&
            boards.map((board: BoardListGet) => {
              return <SupportCard key={board.id} data={board} />;
            })}
        </div>
      </div>
    </>
  );
};

export default SupportList;
