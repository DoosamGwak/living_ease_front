import React, { SyntheticEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import logoDark from "./logoDark.png";
import styles from "./AIMatch.module.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AIQGetAPI } from "../../Services/AiAPI";
import { AIQModel } from "../../Models/AIQ";
import { AxiosResponse } from "axios";
import QRadioBox from "../../Components/QuestionBox/QuestionBox";

const cx = classNames.bind(styles);

type Props = {};

const message_require = "* 문항에 대한 응답이 필요합니다.";

const AIMatch = (props: Props) => {
  useEffect(() => {
    const getQuestionsData = async () => {
      const res = await AIQGetAPI();
      setQuestionsData(res?.data);
      {
        res && res?.data.map(() => validation);
      }
    };
    getQuestionsData();
  }, []);

  const [questionsData, setQuestionsData] = useState<AIQModel[]>();

  const [yupValidation, setYupValidation] = useState();

  const SetYupValidationLength = (x: number) => {};

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

  const validation = Yup.object().shape({
    answer1: Yup.string().required(message_require),
  });

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
          {questionsData?.map((qData) => (
            <>
              <input type="hidden" {...register(`answer${qData.pk}`)} />
              <QRadioBox data={qData} setAnswer={setAnswer} />
            </>
          ))}
          <div className={cx("submitBtnWarp")}>
            <p>
              결과를 출력하는데 <br />
              3분 정도 시간이 소요될 수 있습니다
            </p>{" "}
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

//   return (
//     <>
//       <>
//         <div className={cx("navbar")}>
//           <Link to="/">
//             <img src={logoDark} alt="로고" />
//           </Link>
//         </div>

//         <div className={cx("AI_image")}>
//           <h1>
//             나에게 딱 맞는
//             <br />
//             반려동물 추천 AI
//           </h1>
//           <p>당신의 라이프스타일과 취향을 고려하여 반려동물을 추천해드려요</p>
//         </div>
//       </>
//       <form onSubmit={handleSubmit(handleAnswers)}>
//         <div className={cx("content")}>
//           <div className={cx("section-title")}>사용자에 대하여</div>
//           <div className={cx("section-line")}></div>

//           <div className={cx("questions question1")} data-question="1">
//             <h4>생활환경</h4>
//             <h2>현재 거주하고 있는 주거 형태는 무엇인가요?</h2>
//             <input type="hidden" id="answer1" {...register("answer1")} />
//             <div className={cx("button")} onClick={(e) => onClick1(e)}>
//               아파트
//             </div>
//             <div className={cx("button")} onClick={(e) => onClick1(e)}>
//               주택
//             </div>
//           </div>
//           <div className={cx("warning")} id="warning1">
//             {errors.answer1?.message}
//           </div>
//           <br />

//           <div className={cx("questions question2")} data-question="2">
//             <h2>집의 크기는 어떻게 되나요?</h2>
//             <input
//               value=""
//               type="hidden"
//               id="answer2"
//               {...register("answer2")}
//             />
//             <div className={cx("button")}>작다</div>
//             <div className={cx("button")}>중간</div>
//             <div className={cx("button")}>크다</div>
//           </div>
//           <div className={cx("warning")} id="warning2">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question3")} data-question="3">
//             <h2>집에 마당이 있나요?</h2>
//             <div className={cx("button")}>있다</div>
//             <div className={cx("button")}>없다</div>
//           </div>
//           <div className={cx("warning")} id="warning3">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question4")}>
//             <h2>주변에 산책로가 있나요?</h2>
//             <div className={cx("button")}>있다</div>
//             <div className={cx("button")}>없다</div>
//           </div>
//           <div className={cx("warning")} id="warning4">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question5")}>
//             <h4>라이프스타일</h4>
//             <h2>평소 활동 수준은 어떻게 되나요?</h2>
//             <div className={cx("slider-container")}>
//               <input
//                 type="range"
//                 min="1"
//                 max="5"
//                 value="3"
//                 className={cx("slider")}
//               />
//               <div className={cx("range-labels")}>
//                 <span>적음</span>
//                 <span>많음</span>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question6")} data-question="6">
//             <h2>평일 근무 시간은 어떻게 되나요?</h2>
//             <div className={cx("button")}>
//               규칙적인 근무시간
//               <span className={cx("btnEx2")}>EX. 9시 - 6시</span>
//             </div>
//             <div className={cx("button")}>불규칙적인 근무시간</div>
//           </div>
//           <div className={cx("warning")} id="warning6">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question7")} data-question="7">
//             <h4>가족 구성원</h4>
//             <h2>본인을 포함하여 가족 구성원은 몇 명인가요?</h2>
//             <div className={cx("button")}>
//               <input
//                 className={cx("familyInput")}
//                 type="number"
//                 id="familyInput"
//                 placeholder="숫자를 입력해주세요."
//                 min="1"
//                 // onkeyup="check_family_count(this)"
//               />
//             </div>
//           </div>
//           <div className={cx("warning")} id="warning7">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question8")} data-question="8">
//             <h2>어린 자녀가 있나요?</h2>
//             <div className={cx("button")}>있다</div>
//             <div className={cx("button")}>없다</div>
//           </div>
//           <div className={cx("warning")} id="warning8">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question9")} data-question="9">
//             <h2>다른 반려동물을 키우고 있나요?</h2>
//             <div className={cx("button")} id="btnNone">
//               없다
//             </div>
//             <div className={cx("button")} id="btnHave">
//               있다
//             </div>
//           </div>
//           <div className={cx("warning")} id="warning9">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question9-1")} id="question9-1">
//             <h2>어떤 동물을 키우시나요?</h2>
//             <div className={cx("button")}>강아지</div>
//             <div className={cx("button")}>고양이</div>
//             <div className={cx("button")}>새</div>
//             <div className={cx("button")}>기타</div>
//           </div>
//           <div className={cx("warning")} id="warning9-1">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question10")} data-question="10">
//             <div className={cx("section-title")}>
//               앞으로 만날
//               <br />
//               반려동물에 대하여
//             </div>
//             <div className={cx("section-line")}></div>
//             <h4>반려견에 대한 선호도</h4>
//             <h2>선호하는 반려견의 크기는 어떻게 되나요?</h2>
//             <div className={cx("button")}>
//               소형견
//               <span className={cx("btnEx")}>EX. 말티즈, 치와와</span>
//             </div>
//             <div className={cx("button")}>
//               중형견
//               <span className={cx("btnEx")}>EX. 웰시코기, 진돗개</span>
//             </div>
//             <div className={cx("button")}>
//               대형견
//               <span className={cx("btnEx")}>EX. 리트리버, 사모예드</span>
//             </div>
//           </div>
//           <div className={cx("warning")} id="warning10">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question11")} data-question="11">
//             <h2>짧은 털이나 긴 털 중 어느 것을 선호하시나요?</h2>
//             <div className={cx("button")}>
//               짧은 털<span className={cx("btnEx")}>EX. 치와와, 비글</span>
//             </div>
//             <div className={cx("button")}>
//               긴 털<span className={cx("btnEx")}>EX. 포메라니안, 사모예드</span>
//             </div>
//           </div>
//           <div className={cx("warning")} id="warning11">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />

//           <div className={cx("questions question12")}>
//             <h2>털 빠짐에 있어 민감하신가요?</h2>
//             <div className={cx("slider-container")}>
//               <input
//                 type="range"
//                 min="1"
//                 max="5"
//                 value="3"
//                 className={cx("slider")}
//               />
//               <div className={cx("range-labels")}>
//                 <span>둔감함</span>
//                 <span>민감함</span>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question13")}>
//             <h2>강아지 짖음에 대해 민감하신가요?</h2>
//             <div className={cx("slider-container")}>
//               <input
//                 type="range"
//                 min="1"
//                 max="5"
//                 value="3"
//                 className={cx("slider")}
//               />
//               <div className={cx("range-labels")}>
//                 <span>둔감함</span>
//                 <span>민감함</span>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question14")}>
//             <h2>강아지 훈련 강도는 어디까지 수용 가능한가요?</h2>
//             <div className={cx("slider-container")}>
//               <input
//                 type="range"
//                 min="1"
//                 max="5"
//                 value="3"
//                 className={cx("slider")}
//               />
//               <div className={cx("range-labels")}>
//                 <span>저강도</span>
//                 <span>고강도</span>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question15")} data-question="15">
//             <h4>개 키우기 경험</h4>
//             <h2>반려견을 키운 경험이 있나요?</h2>
//             <div className={cx("button")}>있다</div>
//             <div className={cx("button")}>없다</div>
//           </div>
//           <div className={cx("warning")} id="warning15">
//             * 문항에 대한 응답이 필요합니다.
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />

//           <div className={cx("questions question16")}>
//             <h4>돌봄 시간</h4>
//             <h2>하루에 반려견에게 얼마나 시간을 할애할 수 있나요?</h2>
//             <div className={cx("slider-container")}>
//               <input
//                 type="range"
//                 min="1"
//                 max="5"
//                 value="3"
//                 className={cx("slider")}
//               />
//               <div className={cx("range-labels")}>
//                 <span>30분</span>
//                 <span>1~2시간</span>
//                 <span>5~6시간</span>
//                 <span>10시간</span>
//                 <span>하루종일</span>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />

//           <div className={cx("submitBtnWarp")}>
//             <p>
//               결과를 출력하는데
//               <br />
//               3분 정도 시간이 소요될 수 있습니다
//             </p>
//             <button type="submit" id="submitBtn" className={cx("submitBtn")}>
//               제출하기
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default AIMatch;
