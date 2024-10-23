import classNames from "classnames/bind";
import styles from "./AIRecommend.module.css";
import moveIcon from "./asset/right_icon.png";
import dog from "./asset/sichu.png";
import { useEffect, useState } from "react";
import { AIRModel, CareModel } from "../../Models/AIQ";
import { useNavigate } from "react-router-dom";
import { CaresListGetAPI } from "../../Services/AiAPI";
import { toast } from "react-toastify";
import maleIcon from "./asset/male.png";
import femaleIcon from "./asset/female.png";
const cx = classNames.bind(styles);

const AIRecommendPage = () => {
  const [recommend1, setRecommend1] = useState<AIRModel>();
  // const [recommend2, setRecommend2] = useState<AIRModel>();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const recommends = sessionStorage.getItem("aiRec");
    if (recommends) {
      const recArr = JSON.parse(recommends);
      setRecommend1(recArr[0]);
      // setRecommend2(recArr[1]);
    } else {
      navigate("/aichat");
    }
  }, []);
  const [caresList, setCaresList] = useState<CareModel[]>([]);
  const getCaresInfo = async () => {
    if (recommend1) {
      await CaresListGetAPI(recommend1?.name, 1, null)
        .then((res) => {
          if (res?.status == 200) {
            setCaresList(res?.data.item);
            setActiveModal(true);
          } else {
            toast.warning("주변에 찾으시는 견종의 분양소가 없습니다.");
          }
        })
        .catch((e) => {
          toast.warning("데이터를 불러오지 못했습니다.", e);
        });
    }
  };
  return (
    <div className={cx("content")}>
      <div className={cx("section")}>
        <h2>{recommend1?.name}</h2>
        <img className={cx("dog_image")} src={dog} alt="" />
        <img className={cx("move_btn")} src={moveIcon} alt=""></img>
      </div>
      <div className={cx("pet_infos")}>
        <div className={cx("pet_line")}>
          <div className={cx("pet_info")}> {recommend1?.personality}</div>
          <div className={cx("pet_info")}>{recommend1?.why}</div>
          <button
            className={cx("pet_btn")}
            type="button"
            onClick={getCaresInfo}
          >
            분양소 정보 보기
          </button>
        </div>
      </div>
      <div
        className={cx("pet_detail_recommend")}
        style={activeModal ? {} : { display: "none" }}
      >
        <div>
          <hr onClick={() => setActiveModal(!activeModal)} />
          <h2>분양소 정보</h2>
          <div className={cx("detail_body")}>
            {caresList &&
              caresList.map((care) => (
                <div className={cx("detail_row")}>
                  <div className={cx("pet-profile")}>
                    <img src={care.popfile} alt="강아지 프로필" />
                  </div>
                  <div className={cx("pet-info")}>
                    <h3>{care.name}</h3>
                    <p>{care.careNm}</p>
                    <span>나이: {care.age}</span>
                    <span>
                      성별:
                      {care.sexCd === "F" ? (
                        <img src={femaleIcon} alt="암컷" />
                      ) : (
                        <img src={maleIcon} alt="수컷" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIRecommendPage;
