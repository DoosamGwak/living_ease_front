import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AIChatPage.module.css";
import petmily from "./asset/petmily.png";
import menuIcon from "./asset/menu.png";
import chatgptIcon from "./asset/chatgpt-profile.png";
import chatSpinner from "./asset/chatSpinner.gif";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { AIChatPostAPI } from "../../Services/AiAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

type ChatInput = {
  input: string;
};

const validation = Yup.object().shape({
  input: Yup.string().required("이메일을 입력해주세요."),
});

const AIChatPage = () => {
  const [activeCategory, setActiveCategory] = useState<boolean>(false);
  const navigate = useNavigate();
  const [inputMsg, setInputMsg] = useState<string[]>([
    "vvuioengdaguhbhkuqbino-5437yfb784bi",
  ]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [AIMsg, setAIMsg] = useState<string[]>([
    "안녕하세요 무엇을 도와드릴까요?",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<ChatInput>({
    resolver: yupResolver(validation),
  });
  const handleChat = async (form: ChatInput) => {
    setInputMsg([...inputMsg, form.input]);
    reset({ input: "" });
    await getChatRes(form.input, sessionId);
  };
  const jsonfy = (texts: string): string => {
    const jsonPattern = /startjson\s*\[(.*?)\]\s*endjson/gs;
    const match = jsonPattern.exec(texts);
    console.log(match);
    if (match && match[1]) {
      console.log(match);
      try {
        const recData = JSON.parse(`[${match[1]}]`);
        localStorage.setItem(`aiRec`, JSON.stringify(recData));
        const goToRec =
          "추천을 받으러 이동하기(https://petmily.info/airecommend)";
        return goToRec;
      } catch (e) {
        console.error("JSON 파싱 에러:", e);
        return texts;
      }
    }
    return texts;
  };
  const urlify = (texts: string): (string | JSX.Element)[] => {
    const urlPattern = /(\(https?:\/\/petmily\.info[\/a-zA-Z0-9#?&/=%.-]*\))/g;
    return texts?.split(urlPattern).map((text, index) => {
      console.log(text, "##################################");
      if (urlPattern.test(text)) {
        const url = text.replace(
          /\(https:\/\/petmily\.info([\/a-zA-Z0-9#?&/=%.-]*)\)/g,
          "$1"
        );
        return (
          <>
            <br />
            <br />
            <button>
              <Link to={url} key={index}>
                이동
              </Link>
            </button>
            <br />
            <br />
          </>
        );
      } else {
        console.log(text);
        return text;
      }
    });
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [inputMsg, loading]);
  const getChatRes = async (input: string, session_id: string | null) => {
    setLoading(true);
    await AIChatPostAPI(input, session_id)
      .then((res) => {
        if (res) {
          setAIMsg([...AIMsg, res.data.response]);
          setSessionId(res.data.session_id);
        }
      })
      .catch((e) => {
        toast.warning("에러", e);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div
        className={cx("chatCategory")}
        style={activeCategory ? {} : { display: "none" }}
      >
        <Link to="/aichat" className={cx("modal-row")}>
          <p>반려동물 추천 서비스</p>
          <h3>팻밀리 AI</h3>
        </Link>
        <Link to="/location" className={cx("modal-row")}>
          <p>주변 산책로, 동물병원 추천</p>
          <h3>위치서비스</h3>
        </Link>
        <Link to="/community/walkingmate" className={cx("modal-row")}>
          <p>반려동물의 친구 찾아줄 서비스</p>
          <h3>커뮤니티</h3>
        </Link>
        <Link to="/info/training" className={cx("modal-row")}>
          <p>믿을 수 있는 꿀 정보 서비스</p>
          <h3>정보게시판</h3>
        </Link>
        <Link to="/" className={cx("modal-row")}>
          <p>강아지에 한 모든 정보를 담아둔 서비스</p>
          <h3>견종백과</h3>
        </Link>
        <div className={cx("logout-body")}>
          <button className={cx("logout-bt")}>로그아웃</button>
        </div>
      </div>
      <div
        className={cx("chatCategoryRight", activeCategory ? "active" : null)}
        onClick={() =>
          activeCategory ? setActiveCategory(!activeCategory) : null
        }
      >
        <div className={cx("chatHeader")}>
          <img
            src={menuIcon}
            className={cx("menu-icon")}
            alt="Menu Icon"
            id="menu-button"
            onClick={() => setActiveCategory(!activeCategory)}
          />
          <h2
            className={cx("logo")}
            id="refresh-button"
            onClick={() => navigate("/home")}
          >
            <img src={petmily} alt="Petmily Logo" />
          </h2>
        </div>

        <div className={cx("chat-box")}>
          <div className={cx("chatoverflow")} ref={messagesEndRef}>
            {inputMsg &&
              inputMsg.map((sender: string, idx) => {
                return (
                  <>
                    {sender === "vvuioengdaguhbhkuqbino-5437yfb784bi" ? null : (
                      <div
                        className={cx("message-container")}
                        key={`sender${idx}`}
                      >
                        <div
                          className={cx("message", "user-message")}
                          key={`sender${idx}Inner`}
                        >
                          <p>{sender}</p>
                        </div>
                      </div>
                    )}
                    <div
                      className={cx(
                        "message-container",
                        "bot-message-container"
                      )}
                      key={`ai${idx}`}
                    >
                      <img
                        src={chatgptIcon}
                        className={cx("profile-image")}
                        alt="ChatGPT Profile"
                        key={`ai${idx}Img`}
                      />
                      <div
                        className={cx("message", "bot-message")}
                        key={`ai${idx}Msg`}
                      >
                        {AIMsg[idx] ? (
                          <p>{urlify(jsonfy(AIMsg[idx]))}</p>
                        ) : loading ? (
                          <img src={chatSpinner} />
                        ) : (
                          <p>{urlify(jsonfy(AIMsg[idx]))}</p>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>

        <form className={cx("input-box")} onSubmit={handleSubmit(handleChat)}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            {...register("input")}
          />
          <button type="submit">전송</button>
        </form>
      </div>
    </>
  );
};

export default AIChatPage;
