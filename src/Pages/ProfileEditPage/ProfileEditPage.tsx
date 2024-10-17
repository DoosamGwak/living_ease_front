import styles from "./ProfileEditPage.module.css";
import classNames from "classnames/bind";
import moveBtn from "./asset/move_bt.png";
import profileImgBtn from "./asset/profile_img_bt.png";
import info1 from "./asset/info_001.png";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("이메일을 입력해주세요."),
  password: Yup.string().required("패스워드을 입력해주세요."),
});

const ProfileEditPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <Link to="/profile">
          <img src={moveBtn} alt="move" />
          <h2>프로필 수정</h2>
        </Link>
      </div>
      <form action="" className={cx("profile-body")}>
        <div className={cx("profile-img")}>
          <img src={info1} alt="프로필 사진" className={cx("profile_img")} />
          <label for="profile_image">
            <img
              src={profileImgBtn}
              alt="프로필 사진 수정 버튼"
              id="profile_bt"
            />
          </label>
          <input
            type="file"
            name="profile_image"
            className={cx("profile_image")}
          />
        </div>
        <div className={cx("data-body")}>
          <div className={cx("rows")}>
            <label for="email">이메일</label>
            <p>rlaalswn0613@naver.com</p>
          </div>
          <div className={cx("rows")}>
            <label for="name">이름</label>
            <input type="text" name="name" id="name" value="김민주" />
          </div>
          <div className={cx("rows")}>
            <label for="nickname">
              닉네임 <span>(필수)</span>
            </label>
            <input type="text" name="nickname" id="nickname" value="델리만주" />
          </div>
          <div className={cx("rows")}>
            <label for="password">
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
              <label for="age">나이</label>
              <input
                type="number"
                name="age"
                id="age"
                value="26"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label for="gender">성별</label>
              <select name="gender" id="gender">
                <option value="F">여성</option>
                <option value="M">남성</option>
              </select>
            </div>
          </div>
        </div>
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
