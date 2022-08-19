import React, { useRef, useState, useEffect } from "react";
import "./socialing.css";
import MiniButton from "../components/minibutton";
import { Routes, Route, Link,useParams } from "react-router-dom";
import { PaddingWrap } from "./../components/container";

import ButtonLarge, {
  MobileWrapper,
  RadioNavigater,
  SocialSkeleton,
  StyledInput,
} from "../components/globalComponent";

import TopHeader from "../components/TopHeader";
import RequireAuth from "./RequireAuth";
import axios from "../api/axios";
import SocialDetail from "./socialDetail";

const Socialing = () => {
  // const [socialPost, setSocialPost] = useState(dummyDataForSocial);
  const params = useParams()
  const [socialPost, setSocialPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      axios.get("http://3.39.181.250/social/socialring/").then((response) => {
        setSocialPost(response.data);
        console.log(response.data);
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading("err");
    }
  }, [params]);

  if (isLoading) {
    return (
      <>
        <TopHeader type="3" name="소셜링" URL="/social/newsocial" />
        <RadioNavigater />
      </>
    );
  }else
  return (
    <>
      <Routes path="/">
        <Route
          path="/"
          element={
            <>
              <TopHeader type="3" name="소셜링" URL="/social/newsocial" />
              <RadioNavigater />
              <div className="social_wrapper">
                <div className="search_box">
                  <input type="text" className="search" placeholder=" 검색" />
                </div>
                <Category />
                {socialPost.map((e) => {
                  return SocialingElement(e);
                })}
              </div>
            </>
          }
        />
        <Route path="/:id" element={<SocialDetail />}></Route>
        {/* 허가받아야하는 */}
        <Route path="/newsocial" element={<RequireAuth />}>
          <Route path="/newsocial" element={<NewSocialing />} />
        </Route>
      </Routes>
    </>
  );
};

// ===============단일 소셜링
export const SocialingElement = (props) => {
  return (
    <Link to={`/social/${props.id}`} key={props.id}>
      <div className="social_chatting">
        <img
          src={props.image}
          alt={`${props.title} 대표 이미지`}
          className={
            props.count === props.maxpeople
              ? "chatting_profile opacity-50"
              : "chatting_profile"
          }
        />
        <div className="chatting_title">
          <span
            className={
              props.count !== props.maxpeople
                ? "p bold"
                : "p bold font_light_gray"
            }
          >
            {props.title}
          </span>
          <span className="h5 fontgray">{props.meetdate}</span>
          <span className="h5 fontgray">{props.location}</span>
          <span className="h5 fontgray">
            {`${props.count}/${props.maxpeople}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

// ==============================
// 새소셜
// =================================

export const NewSocialing = () => {
  const transformWrap = useRef();
  const [indexOfForm, setIndexOfForm] = useState(1);

  const handletransform = () => {
    if (indexOfForm > 0 && indexOfForm < 5) {
      transformWrap.current.style.transform = `translateY(-${
        indexOfForm * 100
      }vh)`;
      setIndexOfForm(indexOfForm + 1);
    } else if (indexOfForm >= 5) {
      console.log("마지막페이지입니다");
    }
  };



  return (
    <section className="cutover_100vh">
      <TopHeader type="2" name="소셜링 열기" />


      <section className="social_wrapper">
        <div className="newwsocial_form_wrapper">
          <div className="newsocial_slider" ref={transformWrap}>
            <ChooseNewCategory callback={handletransform} />
            <TypeNewTitle callback={handletransform} />
            <TypeNewDetail callback={handletransform} />
            <TypeNewTime callback={handletransform} />
            <SelectType callback={handletransform} />
          </div>
        </div>
      </section>


    </section>
  );
};

// ===============카테고리 선택창
const ChooseNewCategory = ({ callback }) => {
  return (
    <PaddingWrap>
      <span className="h4 newsocial_title">어떤 소셜링을 열까요?</span>
      <SocialCategory
        title={"운동 / 액티비티"}
        description={"산책,등산,워킹"}
        type="workout"
        active={true}
      />
      <SocialCategory
        title={"푸드 / 드링크"}
        description={"맛집투어, 카페, 디저트"}
        type="food"
      />
      <SocialCategory
        title={"여행 / 나들이"}
        description={"복합문화공간, 피크닉, 드라이브"}
        type="travel"
      />
      <SocialCategory
        title={"교육"}
        description={"반려동물 교육, 훈련, 돌봄"}
        type="education"
      />
      <SocialCategory
        title={"성장 / 자기계발"}
        description={"펫베이커리, 코디네이터, 관리사"}
        type="growth"
      />
      <ButtonLarge children="다음" onClick={callback} />
    </PaddingWrap>
  );
};
// ============제목작성
const TypeNewTitle = ({ callback }) => {
  const [typedTitle, setTypedTitle] = useState(false);
  useEffect((typedTitle) => {}, [typedTitle]);
  
  return (
    <PaddingWrap>
      <span className="h4 newsocial_title">소셜링 제목을 작성해볼까요?</span>
      <StyledInput
        className="social_title_input"
        type="text"
        onChange={(e) => {
          setTypedTitle(e.target.value);
          if (e.target.value.length > 39) {
            e.target.value = e.target.value.substring(0, 39);
          }
        }}
        placeholder="마음이 맞는 이웃과 소셜링을 진행해보세요"
      />
      <div className="input_length_counter">
        <span>{typedTitle ? typedTitle.length : 0}</span>
        <span className="font_light_gray">/40</span>
      </div>
      <ButtonLarge
        className={typedTitle ? "" : "disabled"}
        onClick={typedTitle ? callback : null}
      >
        다음
      </ButtonLarge>
    </PaddingWrap>
  );
};
// =====================내용작성
const TypeNewDetail = ({ callback }) => {
  const [typedDetail, setTypedDetail] = useState(false);

  useEffect(() => {
    console.log(typedDetail);
  }, [typedDetail]);

  return (
    <PaddingWrap>
      <span className="h4 newsocial_title">소셜링 내용을 작성해볼까요?</span>
      <input type="file" id="fileUpload" />
      <StyledInput
        as="textarea"
        id="new_social_detail"
        className="social_title_input"
        type="text"
        onChange={(e) => {
          setTypedDetail(e.target.value);
        }}
        placeholder="소셜링 내용을 입력해주세요"
      />
      <div className="input_length_counter"></div>
      <ButtonLarge
        className={typedDetail ? "" : "disabled"}
        onClick={typedDetail ? callback : null}
      >
        다음
      </ButtonLarge>
    </PaddingWrap>
  );
};
// =====================시간/날짜선택
const TypeNewTime = ({ callback }) => {
  const [typedTime, setTypedTime] = useState();
  const [typedDate, setTypedDate] = useState();

  return (
    <PaddingWrap>
      <span className="h4 newsocial_title">언제 만날까요?</span>
      <input
        type="date"
        onChange={(e) => {
          setTypedDate(e.target.value);
        }}
      />
      <input
        type="time"
        onChange={(e) => {
          setTypedTime(e.target.value);
        }}
      />
      <div className="input_length_counter"></div>
      <ButtonLarge
        className={typedTime && typedDate ? "" : "disabled"}
        onClick={typedTime && typedDate ? callback : null}
      >
        다음
      </ButtonLarge>
    </PaddingWrap>
  );
};
// =====================온오프라인선택
const SelectType = ({ callback }) => {
  const [selectedType, setSelectedType] = useState();

  return (
    <PaddingWrap>
      <span className="h4 newsocial_title">어디서 만날까요?</span>
      <input
        type="button"
        onClick={(e) => {
          setSelectedType("online");
        }}
        value="온라인"
      />
      <input
        type="button"
        onClick={(e) => {
          setSelectedType("offline");
        }}
        value="오프라인"
      />
      <div className="input_length_counter"></div>
      <ButtonLarge
        className={selectedType ? "" : "disabled"}
        onClick={selectedType ? callback : null}
      >
        다음
      </ButtonLarge>
    </PaddingWrap>
  );
};



// ===============카테고리 엘리먼트
const SocialCategory = ({ title, description, type, active }) => {
  return (
    <div
      className={
        active ? "social_category_wrapper active" : "social_category_wrapper"
      }
    >
      <div className="new_social_left_wrap">
        <img
          className="new_social_icon"
          src={`../../img/social_category_${type}.jpg`}
          alt=""
        />
        <div className="new_social_left ">
          <p className="bold">{title}</p>
          <span className="h5 fontgray">{description}</span>
        </div>
      </div>
      <div className="new_social_right_wrap">
        <img
          src={`../../img/selectbtn_${active ? `active` : `disable`}.png`}
          alt="선택됨"
        />
      </div>
    </div>
  );
};
// ============더미데이터
// const dummyDataForSocial = [
//   {
//     id: 1,
//     title: "주말에 같이 산책하실 분~",
//     location: "서울 마포구 합정동",
//     img: "http://3.39.181.250/media/storypictures/new_dog1.jpg",
//     date: "2022-08-07",
//     maxParticipant: 3,
//     participant: ["bbomi84", "ruby123", "junguzzang"],
//     category: "food",
//   },
//   {
//     id: 2,
//     title: "애견동반 영어모임 어떠신가요?",
//     location: "서울 용산구 이태원동",
//     img: "http://3.39.181.250/media/storypictures/new_dog2.jpg",
//     date: "2022-08-01",
//     maxParticipant: 6,
//     participant: [],
//     category: "education",
//   },
//   {
//     id: 3,
//     title: "버릇나쁜 우리 강아지? 사회성 기르기",
//     location: "서울 강남구 역삼동",
//     img: "http://3.39.181.250/media/storypictures/dog1.jpg",
//     date: "2022-08-01",
//     maxParticipant: 6,
//     participant: ["bjungubo", "mi84ng"],
//     category: "education",
//   },
// ];

const Category = () => {
  const miniButtons = useRef();

  return (
    <div className="category">
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
        className="active"
        ref={miniButtons}
      >
        전체보기
      </MiniButton>
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
        ref={miniButtons}
      >
        레스토랑
      </MiniButton>
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
        ref={miniButtons}
      >
        카페
      </MiniButton>
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
        ref={miniButtons}
      >
        호텔
      </MiniButton>
    </div>
  );
};
export default Socialing;
