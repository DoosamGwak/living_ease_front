import React, { SyntheticEvent, useState } from "react";
import styles from "./QuestionRangeBox.module.css";
import classNames from "classnames/bind";
import { AIQModel } from "../../Models/AIQ";

const cx = classNames.bind(styles);

interface AIQsModel {
  data: AIQModel;
}

export default function QRangeBox({ data }: AIQsModel) {
  return (
    <>
      <div className={cx("range-labels")}>
        {data.answer &&
          data.answer.map((answer) => <span>{answer.content}</span>)}
      </div>
    </>
  );
}
