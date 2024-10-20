import { Link } from "react-router-dom";
import logo from "./asset/logoDark.png";
import info1 from "./asset/info_001.png";
import info2 from "./asset/info_002.png";
import info3 from "./asset/info_003.png";
import info4 from "./asset/info_004.png";
import locServ1 from "./asset/location-serv1.png";
import locServ2 from "./asset/location-serv2.png";
import locServ3 from "./asset/location-serv3.png";
import locServ4 from "./asset/location-serv4.png";
import customerDog from "./asset/customer_dog.png";
import styles from "./Home.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import ScrollIntoView from "react-scroll-into-view";

const cx = classNames.bind(styles);

const menuList = [
  { id: "home", title: "홈" },
  { id: "location", title: "위치서비스" },
  { id: "community", title: "커뮤니티" },
  { id: "info", title: "정보게시판" },
  { id: "support", title: "고객지원" },
];

function Home() {
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(cx("active"));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.8,
        rootMargin: "-80px 0px 0px 0px",
      }
    );
    sectionRefs.current.forEach((section) => observer.observe(section));
    return () => {
      sectionRefs.current.forEach((section) => observer.unobserve(section));
    };
  }, []);
  return (
    <>
      <div className={cx("menu-bar")}>
        {menuList.map((menu) => (
          <ScrollIntoView
            selector={`#${menu.id}`}
            style={{ display: "inline" }}
            key={menu.id}
          >
            {menu.title}
          </ScrollIntoView>
        ))}
      </div>
      <div className={cx("pet-family", "img1")}></div>
      <div className={cx("pet-family", "unimg")} id="home">
        <img className={cx("logo-img")} src={logo} alt="로고" />
        <div className={cx("pet-title")}>
          <br />
          PET(반려동물) + FAMILY(가족)
        </div>
        <hr />
        <p className={cx("pet-content")}>
          'PETMILY'는 반려동물을 가족의 일원으로
          <br />
          받아들이기 위한 준비와, 첫 발검을을 도와주 위한
          <br />
          도우미가 되고자 합니다.
        </p>
      </div>
      <div
        className={cx("pet-family", "img2", "section")}
        ref={(el) => el && sectionRefs.current.push(el)}
      ></div>

      <div className={cx("content")}>
        <div className={cx("main-content", "location")} id="location">
          <div
            className={cx("section")}
            ref={(el) => el && sectionRefs.current.push(el)}
          >
            <div className={cx("intro-head")}>
              <h3>오늘도 산책 코스가 고민이신가요?</h3>
              <p>집근처 다양한 산책로를 추천해줄게요</p>
              <hr />
            </div>
            <h2>위치서비스</h2>
            <p>매번 산책로 코스 정하는 게 고민이라면,</p>
            <Link to="/location" className={cx("content-bt")}>
              추천 산책로 보러가기{">"}
            </Link>
            <div className={cx("section-content")}>
              <div className={cx("section-row")}>
                <img src={locServ1} alt="" />
              </div>
              <div className={cx("section-row")}>
                <img src={locServ2} alt="" />
              </div>
              <div className={cx("section-row")}>
                <img src={locServ3} alt="" />
              </div>
              <div className={cx("section-row")}>
                <img src={locServ4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className={cx("main-content", "community")} id="community">
          <div
            className={cx("section")}
            ref={(el) => el && sectionRefs.current.push(el)}
          >
            <div className={cx("intro-head")}>
              <h3>산책 메이트,</h3>
              <h3>
                펫밀리 커뮤니티에서
                <br />
                같이 산책할 친구를 찾아봐요
              </h3>
              <p>
                반려동물을 사랑하는 사람들과의 소통.
                <br />
                펫밀리 커뮤니티에서 반려동물의 친구를 만들어보세요.
              </p>
              <hr />
            </div>
            <div className={cx("sub-title")}>
              <h2>커뮤니티</h2>
              <p>집사들과 소통할 수 있는 기회,</p>
              <Link to="/community/tip" className={cx("content-bt")}>
                산책메이트 구하러가기{">"}
              </Link>
            </div>

            <div className={cx("sub-content")}>
              <div className={cx("rows")}>
                <h3>같이 산책할 사람 있었으면...</h3>
                <div>
                  아파트 신책로 걷고 있는데 이제 가을이네.. <br />
                  같이 산책할 견주분 있었음 좋겠다..
                </div>
              </div>
              <div className={cx("rows")}>
                <h3>이거 병원 가야 하나요?</h3>
                <div>
                  쓰다듬다 이런걸 발견했는데 초보집사라 잘 모르겠어요ㅠㅠ <br />
                  병원 가야 하나요?
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("main-content", "info")} id="info">
          <div
            className={cx("section")}
            ref={(el) => el && sectionRefs.current.push(el)}
          >
            <div className={cx("intro-head")}>
              <h2>정보게시판</h2>
              <p>
                전문가가 알려주는 훈련법, 건강 관리 등 반려동물을 키우는데
                필요한 정보를 정보게시판에서 확인할 수 있어요.
              </p>
            </div>
            <div className={cx("section-content")}>
              <div className={cx("info-section-row", "section-row")}>
                <h2>
                  우리집 댕댕이
                  <br />
                  이번 예방접종은 언제지?
                </h2>
                <p>
                  <Link to="/info/vaccine">예방접종 시기가 궁금하다면,</Link>
                </p>
                <img src={info1} alt="" />
              </div>
              <div className={cx("info-section-row", "section-row")}>
                <h2>
                  배변훈련이 어려워요
                  <br />
                  뭐부터 해야 되죠?
                </h2>
                <p>
                  <Link to="/info/training">훈련법이 궁금하다면,</Link>
                </p>
                <img src={info2} alt="" />
              </div>
              <div className={cx("info-section-row", "section-row")}>
                <h2>
                  반려동물이 점점
                  <br />살 찌는 게 걱정인가요?
                </h2>
                <p>
                  <Link to="/info/healthyfood">건강한 식단이 궁금하다면,</Link>
                </p>
                <img src={info3} alt="" />
              </div>
              <div className={cx("info-section-row", "section-row")}>
                <h2>
                  주인이 더 좋아한다는
                  <br />
                  반려동물 장난감
                </h2>
                <p>
                  <Link to="/info/supplies">용품이 궁금하다면,</Link>
                </p>
                <img src={info4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className={cx("main-content", "support")} id="support">
          <img src={customerDog} alt="고객지원" />
          <div
            className={cx("section")}
            ref={(el) => el && sectionRefs.current.push(el)}
          >
            <h2>고객지원</h2>
            <p>펫밀리는 고객의 지원에 늘 최선을 다하고 있습니다.</p>
            <p>
              문의사하이 있다면 1:1문의, 전화, 이메일을
              <br />
              이용해 주세요.
            </p>
            <Link to="/support/directmsg" className={cx("support-bt")}>
              문의하러 가기 {">"}{" "}
            </Link>
            <div className={cx("support-bottom")}>
              <div className={cx("support-row", "support-row-left")}>
                전화 문의
                <span>02-123-4567</span>
              </div>
              <div className={cx("support-row", "support-row-right")}>
                이메일 문의
                <span>PETMILY@GMAIL.COM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("main-content", "bottom")} id="bottom">
        <div
          className={cx("section")}
          ref={(el) => el && sectionRefs.current.push(el)}
        >
          <p>(주)펫밀리</p>
          <p>대표이사: 이승주 김민주 서영환 정순겸</p>
          <p>회사위치: 서울 강남구 논현로00길 100</p>
          <p>사업자번호: 123-45-12345</p>
        </div>
      </div>
    </>
  );
}

export default Home;
