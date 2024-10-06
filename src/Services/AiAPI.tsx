import axios from "axios";
import { AIQModel } from "../Models/AIQ";
import { handleError } from "../Helpers/ErrorHandler";

const api = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: api,
  // headers: {
  //     Authorization: `Bear ${}`
  // }
});

export const AIQGetAPI = async () => {
  try {
    const res = await axios.get<AIQModel[]>(api + "/pets/questions");
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
