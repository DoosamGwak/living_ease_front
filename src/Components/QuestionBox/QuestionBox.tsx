import React, { SyntheticEvent, useState } from "react";
import styles from "./QuestionBox.module.css";
import classNames from "classnames/bind";
import { AIQModel } from "../../Models/AIQ";
import { useParams } from "react-router-dom";
import { UseFormSetValue } from "react-hook-form";

const cx = classNames.bind(styles);

interface AIQsModel {
  data: AIQModel;
  setAnswer: Function;
}

export default function QRadioBox({ data, setAnswer }: AIQsModel) {
  const [active, setActive] = useState<boolean>(false);
  const onClick = (e: SyntheticEvent) => {
    setAnswer(`answer${data.pk}`, (e.target as HTMLDivElement).innerText);
  };
  return (
    <>
      <div className={cx("questions")}>
        <h4>{data.title}</h4>
        <h2>{data.content}</h2>

        {data.answer &&
          data.answer.map((answer) => (
            <button className={cx(`button`)} onClick={(e) => onClick(e)}>
              {answer.content}
            </button>
          ))}
      </div>
    </>
  );
}
