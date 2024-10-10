import React, { SyntheticEvent, useState } from "react";
import styles from "./QuestionRangeBox.module.css";
import classNames from "classnames/bind";
import { AIQModel } from "../../Models/AIQ";

const cx = classNames.bind(styles);

interface QRangeProp {
  register: any;
  Q: AIQModel;
  setValue: any;
}

export default function QRangeBox({ Q, setValue, register }: QRangeProp) {
  const type = Q && Q.type === "사용자" ? "user" : "pet";
  return (
    <div className={cx("questions")}>
      <h2>{Q.content}</h2>
      <div className={cx("slider-container")}>
        <input
          type="hidden"
          value={Q.content}
          {...register(`${type}.question${Q.pk}`)}
        />
        <input
          type="range"
          min={1}
          max={5}
          className={cx("slider-input")}
          {...register(`${type}.answer${Q.pk}`, {
            onChange: (e: React.FormEvent<HTMLInputElement>) =>
              setValue(`${type}.answer${Q.pk}`, e.currentTarget.value),
            required: {
              value: true,
              message: "* 문항에 대한 응답이 필요합니다.",
            },
          })}
        />
        <div className={cx("range-labels")}>
          {Q.answer &&
            Q.answer.map((answer) => (
              <span key={`a${answer.pk}`}>{answer.content}</span>
            ))}
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
