import axios from "axios";
import { AIChatModel, AIQModel, AIRsModel } from "../Models/AIQ";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./ApiURL";

export const AIQPostAPI = async (user: JSON, pet: JSON) => {
  try {
    console.log(axios.defaults.headers.common["Authorization"]);
    const res = await axios.post<AIRsModel>(
      api + "/pets/recommands",
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
    console.log(res);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const AIQGetAPI = async () => {
  try {
    const res = await axios.get<AIQModel[]>(api + "/pets/questions");
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const AIChatPostAPI = async (input: string) => {
  try {
    const res = await axios.post<AIChatModel>(api + "/chatbot", {
      input: input,
    });
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
