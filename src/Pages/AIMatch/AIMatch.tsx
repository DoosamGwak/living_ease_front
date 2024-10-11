import { useEffect, useState } from "react";
import logoLight from "./asset/logoLight.png";
import styles from "./AIMatch.module.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { AIQGetAPI } from "../../Services/AiAPI";
import { AIQModel } from "../../Models/AIQ";
import QRadioBox from "../../Components/QuestionBox/QuestionBox";
import QRangeBox from "../../Components/QuestionRangeBox/QuestionRangeBox";
import { useForm } from "react-hook-form";
import { useAIRec } from "../../Context/useAI";
import { AnyObject } from "yup";

const cx = classNames.bind(styles);

function AIMatch() {
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
  } = useForm();

  const { getRecommend } = useAIRec();
  const onSubmit = (data: AnyObject) => {
    getRecommend(data.user, data.pet);
  };
  // const [title, setTitle] = useState<string>("");
  return (
    <>
      <>
        <div className={cx("navbar")}>
          <Link to="/">
            <img src={logoLight} alt="로고" />
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {questionsData?.map((Q) =>
            Q && Q.content_type === "RANGE" ? (
              <QRangeBox
                register={register}
                Q={Q}
                setValue={setValue}
                key={Q.pk}
              />
            ) : (
              <QRadioBox
                register={register}
                Q={Q}
                setValue={setValue}
                errors={errors}
                key={Q.pk}
              />
            )
          )}
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
}

export default AIMatch;
