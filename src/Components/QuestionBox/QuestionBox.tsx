import React, { SyntheticEvent, useState } from "react";
import styles from "./QuestionBox.module.css";
import classNames from "classnames/bind";
import { AIAModel, AIQModel } from "../../Models/AIQ";

const cx = classNames.bind(styles);

interface QProp {
  data: AIQModel;
  setAnswer: Function;
}

export default function QRadioBox({ data, setAnswer }: QProp) {
  const [active, setActive] = useState<number | null>(null);
  const onClick = (e: SyntheticEvent, idx: number) => {
    setAnswer(`answer${data.pk}`, (e.target as HTMLButtonElement).innerText);
    setActive(idx);
  };
  return (
    <>
      <h2>{data.content}</h2>
      {data.answer &&
        data.answer.map((answer) => (
          <button
            key={"a" + answer.pk}
            className={cx(
              "button" + `${active === answer.pk ? "-active" : ""}`
            )}
            onClick={(e) => onClick(e, answer.pk)}
          >
            {answer.content}
          </button>
        ))}
    </>
  );
}
