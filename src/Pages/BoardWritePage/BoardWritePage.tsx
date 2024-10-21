import classNames from "classnames/bind";
import styles from "./BoardWritePage.module.css";
import moveBtn from "./asset/move_bt.png";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { boardPostAPI } from "../../Services/BoardAPI";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

export type BoardFormInputs = {
  category: string;
  title: string;
  content: string;
  image: File[] | null;
};

const BoardWritePage = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BoardFormInputs>();
  const handleBoard = async (form: BoardFormInputs) => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    if (form.image) {
      Array.from(form.image).forEach((file) => {
        console.log(file);
        formData.append("image", file);
      });
    }
    const res = await boardPostAPI(formData, `community/${form.category}`);
    console.log(res, res?.data.pk);
    if (res?.status == 201) {
      console.log(res);
      toast("게시글이 등록되었습니다.");
      navigate(`/board/${form.category}/${res?.data.pk}`);
    } else {
      toast("게시글 등록에 실패하였습니다.");
    }
  };

  const [previewUrl, setPreviewUrl] = useState<string[] | null>(null);
  const [uploadImage, setUploadImage] = useState<File[] | null>(null);
  const [uploadImageModal, setUploadImgModal] = useState<boolean>(true);

  const clickFileSeletor = () => {
    const fileSelector = document.getElementById("board-picture");
    if (fileSelector) {
      fileSelector.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 8);
      setUploadImage((prev) => {
        const updatedFiles = prev ? [...prev, ...newFiles] : newFiles;
        setValue("image", updatedFiles.slice(0, 8));
        return updatedFiles.slice(0, 8);
      });
      newFiles.map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          setPreviewUrl((prev) => {
            const updatedUrls = prev ? [...prev, imageUrl] : [imageUrl];
            return updatedUrls.slice(0, 8);
          });
        };
        reader.readAsDataURL(file);
      });
    }

    console.log(uploadImage);
    if (uploadImage?.length === 8) {
      setUploadImgModal(false);
    }
  };

  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <span onClick={() => navigate(-1)}>
          <img src={moveBtn} alt="" />
        </span>
        커뮤니티
      </div>
      <div className={cx("content-info")}>
        <h2>글 등록하기</h2>
      </div>
      <div className={cx("content-bottom")}>
        <form onSubmit={handleSubmit(handleBoard)}>
          <p>
            <label htmlFor="board-category">카테고리</label>
            <select
              id="board-category"
              {...register("category", {
                required: true,
                pattern: /^[a-zA-Z]*$/,
              })}
            >
              <option>카테고리를 선택해 주세요.</option>
              <option value="walkingmate">산책 메이트</option>
              <option value="tip">꿀팁</option>
              <option value="etc">자유게시판</option>
            </select>
            {errors.category && errors.category.type === "pattern" && (
              <p>카테고리를 선택해주세요.</p>
            )}
          </p>
          <p>
            <label htmlFor="board-title">제목</label>
            <input
              type="text"
              id="board-title"
              placeholder="30자 이내로 입력해 주세요."
              {...register("title", { required: true })}
            />
            {errors.title && <p>제목을 입력해주세요.</p>}
          </p>
          <p>
            <label htmlFor="board-content">제목</label>
            <textarea
              id="board-content"
              placeholder="내용을 입력해 주세요."
              {...register("content", { required: true })}
            ></textarea>
            {errors.content && <p>내용을 입력해주세요.</p>}
          </p>
          <p className={cx("board-files")}>
            <label htmlFor="board-picture">
              사진 첨부 <span>{"(선택)"}</span>
            </label>
            <input
              type="file"
              className={cx("board-picture")}
              id="board-picture"
              accept=".png, .jpg, .jpeg, .gif"
              {...register("image")}
              onChange={handleFileChange}
              multiple
            />
          </p>
          <div className={cx("picture-body")}>
            {previewUrl?.map((image, idx) => (
              <div className={cx("picture-content")} key={`imagePreview${idx}`}>
                <img
                  src={image}
                  alt={`imagePreview${idx}`}
                  className={cx("picture-preview")}
                />
              </div>
            ))}

            <div
              className={cx("picture-content")}
              onClick={clickFileSeletor}
              style={uploadImageModal ? {} : { display: "none" }}
            >
              +
            </div>
          </div>
          <div className={cx("board-bts")}>
            <button className={cx("board-censer")}>취소</button>
            <button className={cx("board-ok")}>등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWritePage;
