import React, { SyntheticEvent, useState } from "react";
import styles from "./QuestionBox.module.css";
import classNames from "classnames/bind";
import { AIQModel } from "../../Models/AIQ";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

interface AIQsModel {
  data: AIQModel;
  onChange: () => void;
}

export default function QRadioBox({ data, onChange }: AIQsModel) {
  const [value, setValue] = useState<string>("");
  const onClick = (e: SyntheticEvent) => {
    setValue((e.target as HTMLDivElement).innerText);
  };
  console.log(data.answer);
  return (
    <>
      <div className={cx("questions")} data-question="1">
        <h4>{data.title}</h4>
        <h2>{data.content}</h2>

        {data.answer &&
          data.answer.map((answer) => (
            <button className={cx("button")} onClick={(e) => onClick(e)}>
              {answer.content}
            </button>
          ))}
      </div>
    </>
  );
}
