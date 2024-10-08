import React, { SyntheticEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import logoDark from "./logoDark.png";
import styles from "./AIMatch.module.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AIQGetAPI } from "../../Services/AiAPI";
import { AIQModel } from "../../Models/AIQ";
import QRadioBox from "../../Components/QuestionBox/QuestionBox";
import QRangeBox from "../../Components/QuestionRangeBox/QuestionRangeBox";

const cx = classNames.bind(styles);

type Props = {};

const message_require = "* 문항에 대한 응답이 필요합니다.";

const AIMatch = (props: Props) => {
  useEffect(() => {
    const getQuestionsData = async () => {
      const res = await AIQGetAPI();
      setQuestionsData(res?.data);
    };
    getQuestionsData();
  }, []);

  const [questionsData, setQuestionsData] = useState<AIQModel[]>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const handleAnswers = (form: any) => {};
  const setAnswer = (qPk: any, answer: string) => {
    setValue(qPk, answer);
  };

  return (
    <>
      <>
        <div className={cx("navbar")}>
          <Link to="/">
            <img src={logoDark} alt="로고" />
          </Link>
        </div>

        <div className={cx("AI_image")}>
          <h1>
            나에게 딱 맞는
            <br />
            반려동물 추천 AI
          </h1>
          <p>당신의 라이프스타일과 취향을 고려하여 반려동물을 추천해드려요</p>
        </div>
      </>
      <div className={cx("content")}>
        <form onSubmit={handleSubmit(handleAnswers)}>
          <div className={cx("questions")}>
            {questionsData?.map((qData) => (
              <>
                {qData.content_type === "RANGE" ? (
                  <>
                    <h4>{qData.title}</h4>
                    <h2>{qData.content}</h2>
                    <div className={cx("slider-container")}>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        className={cx("slider-input")}
                        {...register(`answer${qData.pk}`)}
                      />
                      <QRangeBox data={qData} />
                    </div>
                  </>
                ) : (
                  <>
                    <h4>{qData.title}</h4>
                    <QRadioBox data={qData} setAnswer={setAnswer} />
                    <input type="hidden" {...register(`answer${qData.pk}`)} />
                  </>
                )}
              </>
            ))}
          </div>
          <div className={cx("submitBtnWarp")}>
            <p>
              결과를 출력하는데 <br />
              3분 정도 시간이 소요될 수 있습니다
            </p>
            <button type="submit" id="submitBtn" className={cx("submitBtn")}>
              제출하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIMatch;
