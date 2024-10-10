import React, { SyntheticEvent, useState } from "react";
import styles from "./QuestionBox.module.css";
import classNames from "classnames/bind";
import { AIAModel, AIQModel } from "../../Models/AIQ";
import { ErrorMessage } from "@hookform/error-message";

const cx = classNames.bind(styles);

type QBoxProp = {
  register: any;
  Q: AIQModel;
  setValue: any;
  errors: any;
};

export default function QRadioBox({ register, Q, setValue, errors }: QBoxProp) {
  const [active, setActive] = useState<number | null>(null);
  const onClick = (
    e: React.FormEvent<HTMLButtonElement>,
    idx: number,
    name: string
  ) => {
    setActive(idx);
    setValue(name, e.currentTarget.value);
  };
  const type = Q && Q.type === "사용자" ? "user" : "pet";
  return (
    <>
      <div className={cx("questions")}>
        <h2>{Q.content}</h2>
        <input
          type="hidden"
          value={Q.content}
          {...register(`${type}.question${Q.pk}`)}
        />
        <input
          type="hidden"
          {...register(`${type}.answer${Q.pk}`, {
            required: {
              value: true,
              message: "* 문항에 대한 응답이 필요합니다.",
            },
          })}
        />
        {Q?.answer &&
          Q.answer.map((answer: AIAModel) => (
            <button
              type="button"
              key={`a${answer.pk}`}
              value={Q.content}
              className={cx(
                "button",
                `${active === answer.pk ? "-active" : ""}`
              )}
              onClick={(e) => onClick(e, answer.pk, `${type}.answer${Q.pk}`)}
            >
              {answer.content}
            </button>
          ))}
      </div>
      <ErrorMessage
        errors={errors}
        name={`answer${Q.pk}`}
        render={({ message }) => <div className={cx("warning")}>{message}</div>}
      />
      <br />
      <br />
      <br />
    </>
  );
}
