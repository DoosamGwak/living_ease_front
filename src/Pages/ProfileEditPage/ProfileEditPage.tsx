import styles from "./ProfileEditPage.module.css";
import classNames from "classnames/bind";
import moveBtn from "./asset/move_bt.png";
import profileImgBtn from "./asset/profile_img_bt.png";
import info1 from "./asset/info_001.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { getProfileAPI } from "../../Services/AuthAPI";
import { UserProfileDetail } from "../../Models/User";

const cx = classNames.bind(styles);

type ProfileEditInput = {
  profile_image: File | null;
  nickname: string;
  age: number | null;
  gender: string | null;
};

const ProfileEditPage = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileDetail>();
  useEffect(() => {
    const getUserInfo = async () => {
      const userObj = user;
      if (userObj) {
        const res = await getProfileAPI(userObj?.pk);
        setUserProfile(res?.data);
      }
    };
    getUserInfo();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditInput>();
  const handleProfileSubmit = () => {};
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
          <img src={info1} alt="프로필 사진" className={cx("profile_img")} />
          <label htmlFor="profile_image">
            <img
              src={profileImgBtn}
              alt="프로필 사진 수정 버튼"
              id="profile_bt"
            />
          </label>
          <input
            type="file"
            className={cx("profile_image")}
            {...register("profile_image")}
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
              name="name"
              id="name"
              defaultValue={userProfile?.nickname}
            />
          </div>
          <div className={cx("rows")}>
            <label htmlFor="nickname">
              닉네임 <span>(필수)</span>
            </label>
            <input
              type="text"
              id="nickname"
              defaultValue={userProfile?.nickname}
              {...register("nickname", { required: true })}
            />
            {errors.nickname ? (
              <p className={cx("password-warning")}>
                {errors.nickname.message}
              </p>
            ) : (
              ""
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
                defaultValue={`${userProfile?.age}`}
                min="1"
                max="100"
                {...register("age")}
              />
            </div>
            <div>
              <label htmlFor="gender">성별</label>
              <select
                id="gender"
                defaultValue={userProfile && `${userProfile?.gender}`}
                {...register("gender")}
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
