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
  const navigate = useNavigate();
  const [inputMsg, setInputMsg] = useState<string[]>([
    "vvuioengdaguhbhkuqbino-5437yfb784bi",
  ]);
  const [AIMsg, setAIMsg] = useState<string[]>([
    "안녕하세요 무엇을 도와드릴까요?",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<ChatInput>({
    resolver: yupResolver(validation),
  });
  const handleChat = (form: ChatInput) => {
    setInputMsg([...inputMsg, form.input]);
    reset({ input: "" });
    getChatRes(form.input);
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [inputMsg, loading]);
  const getChatRes = async (input: string) => {
    setLoading(true);
    await AIChatPostAPI(input)
      .then((res) => {
        if (res) {
          setAIMsg([...AIMsg, res.data.response]);
        }
      })
      .catch((e) => {
        toast.warning("에러", e);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className={cx("chatHeader")}>
        <img
          src={menuIcon}
          className={cx("menu-icon")}
          alt="Menu Icon"
          id="menu-button"
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
                      <div className={cx("message", "user-message")}>
                        <p>{sender}</p>
                      </div>
                    </div>
                  )}
                  <div
                    className={cx("message-container", "bot-message-container")}
                    key={`ai${idx}`}
                  >
                    <img
                      src={chatgptIcon}
                      className={cx("profile-image")}
                      alt="ChatGPT Profile"
                    />
                    <div className={cx("message", "bot-message")}>
                      {AIMsg[idx] ? (
                        <p>{AIMsg[idx]}</p>
                      ) : loading ? (
                        <img src={chatSpinner} />
                      ) : (
                        <p>{AIMsg[idx]}</p>
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
    </>
  );
};

export default AIChatPage;