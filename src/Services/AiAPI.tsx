import axios from "axios";
import { AIQModel, AIRsModel } from "../Models/AIQ";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./ApiURL";
import { AnyObject } from "yup";

export const AIQGetAPI = async () => {
  try {
    const res = await axios.get<AIQModel[]>(api + "/pets/questions");
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const AIQPostAPI = async (user: AnyObject, pet: AnyObject) => {
  try {
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
