import React, { createContext, useEffect, useState } from "react";
import { AIRModel } from "../Models/AIQ";
import { AIQPostAPI } from "../Services/AiAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type AIContextType = {
  recommend1: AIRModel | null;
  recommend2: AIRModel | null;
  getRecommend: (user: JSON, pet: JSON) => void;
};

type Props = { children: React.ReactNode };

const AIContext = createContext<AIContextType>({} as AIContextType);

export const AIRProvider = ({ children }: Props) => {
  const [recommend1, setRecommend1] = useState<AIRModel | any>(null);
  const [recommend2, setRecommend2] = useState<AIRModel | any>(null);
  const [isRecomendReady, setIsRecomendReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const aiRec1 = sessionStorage.getItem("aiRec1");
    const aiRec2 = sessionStorage.getItem("aiRec2");
    if (aiRec1 && aiRec2) {
      setRecommend1(JSON.parse(aiRec1));
      setRecommend2(JSON.parse(aiRec2));
    }
    setIsRecomendReady(true);
  }, []);

  const getRecommend = async (user: JSON, pet: JSON) => {
    await AIQPostAPI(user, pet)
      .then((res) => {
        if (res) {
          sessionStorage.setItem(
            `aiRec1`,
            JSON.stringify(res?.data.recommendations[0])
          );
          sessionStorage.setItem(
            `aiRec2`,
            JSON.stringify(res?.data.recommendations[1])
          );
          setRecommend1(res?.data.recommendations[0]);
          setRecommend2(res?.data.recommendations[1]);
          toast.success("추천!");
          navigate("/airecommend");
        }
      })
      .catch((e) => {
        toast.warning("서버 에러!");
        console.log(e);
      });
  };

  return (
    <AIContext.Provider value={{ recommend1, recommend2, getRecommend }}>
      {isRecomendReady ? children : null}
    </AIContext.Provider>
  );
};

export const useAIRec = () => React.useContext(AIContext);
