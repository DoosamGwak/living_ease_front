import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./ApiURL";
import { BoardDetailGet, BoardListGet, BoardPost } from "../Models/Board";

export const boardPutAPI = async (title: string, content: string) => {
  try {
    const res = await axios.put<BoardDetailGet>(api + "boards/info/vaccine/", {
      title: title,
      content: content,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const boardDeleteAPI = async (pk: number) => {
  try {
    const res = await axios.delete(api + `/boards/${pk}/`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const boardListGetAPI = async (category: string) => {
  try {
    const res = await axios.get<BoardListGet[]>(api + `/boards/${category}/`);
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const boardDetailGetAPI = async (pk: number) => {
  try {
    const res = await axios.get<BoardDetailGet>(api + `/boards/${pk}/`);
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const boardPostAPI = async (form: FormData, category: string) => {
  try {
    const res = await axios.post<BoardPost>(
      api + `/boards/${category}/`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  } catch (error) {
    handleError(error);
  }
};
