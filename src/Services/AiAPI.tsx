import axios from "axios";
import { AIChatModel, AIQModel, AIRsModel } from "../Models/AIQ";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./ApiURL";

export const AIQPostAPI = async (user: JSON, pet: JSON) => {
  try {
    const res = await axios.post<AIRsModel>(
      api + "/pets/recommands/",
      {
        user: user,
        pet: pet,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const AIQGetAPI = async () => {
  try {
    const res = await axios.get<AIQModel[]>(api + "/pets/questions/");
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const AIChatPostAPI = async (
  input: string,
  session_id: string | null
) => {
  try {
    const res = await axios.post<AIChatModel>(api + "/chatbot/", {
      input: input,
      session_id: session_id,
    });
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
