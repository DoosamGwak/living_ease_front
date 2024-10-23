import styles from "./ProfilePage.module.css";
import classNames from "classnames/bind";
import profileIcon1 from "./asset/profile_icon1.png";
import profileIcon2 from "./asset/profile_icon2.png";
import profileIcon3 from "./asset/profile_icon3.png";
import profileIcon4 from "./asset/profile_icon4.png";
import profileIcon5 from "./asset/profile_icon5.png";
import profileIcon6 from "./asset/profile_icon6.png";
import profileTopBtn from "./asset/profile_top_bt.png";
import moveBtn from "./asset/move_bt.png";
import { useAuth } from "../../Context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileAPI } from "../../Services/AuthAPI";
import { UserProfileDetail } from "../../Models/User";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileDetail>();
  const navigate = useNavigate();
  const notYetToast = () => {
    toast("서비스 준비중");
  };
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

  return (
    <div className={cx("content")}>
      <div className={cx("content-top")}>
        <a onClick={() => navigate("/home")}>
          <img src={moveBtn} alt="" />
        </a>
        <div className={cx("user-info")}>
          <div className={cx("left-info")}>
            <img src={userProfile?.profile_image} alt="프로필 사진" />
          </div>
          <div className={cx("right-info")}>
            <h3>{userProfile?.nickname}</h3>
            <p>{userProfile?.email}</p>
          </div>
        </div>
      </div>
      <div className={cx("content-info")}>
        <div className={cx("move-top-body")}>
          <span onClick={notYetToast}>
            <img src={profileTopBtn} alt="애견수첩" />
          </span>
        </div>
        <table className={cx("move-body")}>
          <tbody>
            <tr>
              <td>
                <span onClick={notYetToast}>
                  <img src={profileIcon1} alt="게시물 관리" />
                  게시물 관리
                </span>
              </td>
              <td>
                <span onClick={notYetToast}>
                  <img src={profileIcon2} alt="내 댓글" />내 댓글
                </span>
              </td>
              <td>
                <span onClick={notYetToast}>
                  <img src={profileIcon3} alt="찜 목록" />찜 목록
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span onClick={notYetToast}>
                  <img src={profileIcon4} alt="매칭 결과" />
                  매칭 결과
                </span>
              </td>
              <td>
                <Link to={"/support/directmsg"}>
                  <img src={profileIcon5} alt="1:1 문의" />
                  1:1 문의
                </Link>
              </td>
              <td>
                <Link to="/profile/edit">
                  <img src={profileIcon6} alt="프로필 관리" />
                  프로필 관리
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={cx("content-bottom")}>
        <Link to={"/support/notice"}>
          <div className={cx("support-bottom-left")}>
            <h3>
              고객센터<span>(평일 09:00~18:00)</span>
            </h3>
            <p>02-1234-5678</p>
          </div>
          <div
            className={cx("support-bottom-right")}
            onClick={() => navigate("/support/notice")}
          >
            <img src={moveBtn} alt="" />
          </div>
        </Link>
        <div className={cx("profile-bottom-btn-body")}>
          <button onClick={() => logout()}>로그아웃</button>
          <button onClick={() => toast("아직 미구현")}>회원탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
