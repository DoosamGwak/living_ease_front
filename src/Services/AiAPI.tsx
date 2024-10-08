import axios from "axios";
import { AIQModel } from "../Models/AIQ";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./ApiURL";

export const AIQGetAPI = async () => {
  try {
    const res = await axios.get<AIQModel[]>(api + "/pets/questions");
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
