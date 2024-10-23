import styles from "./ProfileEditPage.module.css";
import classNames from "classnames/bind";
import moveBtn from "./asset/move_bt.png";
import profileImgBtn from "./asset/profile_img_bt.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { getProfileAPI, updateProfileAPI } from "../../Services/AuthAPI";
import { UserProfileDetail } from "../../Models/User";

const cx = classNames.bind(styles);

type ProfileEditInput = {
  profile_image: File | null;
  nickname: string;
  age: number | null;
  gender: string;
  name: string | null;
};

const ProfileEditPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfileDetail>();
  useEffect(() => {
    const getUserInfo = async () => {
      const userObj = user;
      if (userObj) {
        const res = await getProfileAPI(userObj?.pk);
        setUserProfile(res?.data);
        setImgSrc(res?.data.profile_image);
      }
    };
    getUserInfo();
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileEditInput>();

  const clickFileSeletor = () => {
    const fileSelector = document.getElementById("profile_image");
    if (fileSelector) {
      fileSelector.click();
    }
  };

  const [imgSrc, setImgSrc] = useState<any>(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    setValue("profile_image", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result || null);
        resolve();
        console.log(imgSrc);
      };
    });
  };

  const handleProfileSubmit = async (form: ProfileEditInput) => {
    const userObj = user;
    const formData = new FormData();
    userObj && formData.append("email", userObj.email);
    formData.append("nickname", form.nickname);
    form.name && formData.append("name", form.name.toString());
    form.age && formData.append("age", form.age.toString());
    formData.append("gender", form.gender);
    form.profile_image && formData.append("profile_image", form.profile_image);
    console.log(formData);
    if (userObj) {
      await updateProfileAPI(userObj?.pk, formData);
      navigate("/profile/detail");
    }
  };
  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <Link to="/profile/detail">
          <img src={moveBtn} alt="move" />
          <h2>프로필 수정</h2>
        </Link>
      </div>
      <form
        className={cx("profile-body")}
        onSubmit={handleSubmit(handleProfileSubmit)}
      >
        <div className={cx("profile-img")}>
          <img src={imgSrc} alt="프로필 사진" className={cx("profile_img")} />
          <label htmlFor="profile_image" onClick={() => clickFileSeletor}>
            <img
              src={profileImgBtn}
              alt="프로필 사진 수정 버튼"
              id="profile_bt"
            />
          </label>
          <input
            type="file"
            id="profile_image"
            className={cx("profile_image")}
            {...register("profile_image")}
            onChange={onUpload}
          />
        </div>
        <div className={cx("data-body")}>
          <div className={cx("rows")}>
            <label htmlFor="email">이메일</label>
            <p>{userProfile?.email}</p>
          </div>
          <div className={cx("rows")}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              defaultValue={
                !!userProfile?.name ? userProfile.name : userProfile?.nickname
              }
            />
          </div>
          <div className={cx("rows")}>
            <label htmlFor="nickname">
              닉네임 <span>(필수)</span>
            </label>
            <input
              type="text"
              id="nickname"
              {...register("nickname", { required: true })}
              defaultValue={userProfile?.nickname}
            />
            {errors.nickname && errors.nickname.type === "required" && (
              <p className={cx("password-warning")}>
                닉네임은 필수로 입력해주세요
              </p>
            )}
          </div>
          <div className={cx("rows")}>
            <label htmlFor="password">
              비밀번호 <span>(필수)</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value="123456789"
            />
            <a href="">
              <img src={moveBtn} alt="비밀번호 변경" />
            </a>
          </div>
          <div className={cx("rows")}>
            <div>
              <label htmlFor="age">나이</label>
              <input
                type="number"
                id="age"
                min="1"
                max="100"
                {...register("age")}
                defaultValue={userProfile?.age?.toString()}
              />
            </div>
            <div>
              <label htmlFor="gender">성별</label>
              <select
                id="gender"
                {...register("gender")}
                defaultValue={userProfile && `${userProfile?.gender}`}
              >
                <option value="F">여성</option>
                <option value="M">남성</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit">수정하기</button>
      </form>
      <div className={cx("profile-bottom")}>
        <p>
          회원정보를 삭제하시겠어요?
          <button>회원탈퇴</button>
        </p>
      </div>
    </div>
  );
};

export default ProfileEditPage;
