import React, { useRef, useState } from "react";
import "./socialing.css";
import MiniButton from "../components/minibutton";
import { Routes, Route } from "react-router-dom";
import { PaddingWrap } from "./../components/container";
import ButtonLarge, { RadioNavigater, StyledInput } from "../components/globalComponent";
import TopHeader from "../components/TopHeader";


const Socialing = () => {
  const [socialPost, setSocialPost] = useState(dummyDataForSocial);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
            <TopHeader type="3" name="소셜링" />
            <RadioNavigater/>
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
        <Route path="/newsocial" element={<NewSocialing />} />
      </Routes>
    </>
  );
};

const NewSocialing = (user) => {
  return (
    <>
      <section className="social_wrapper">
        {/* <ChooseNewCategory />
        <TypeNewTitle /> 
        <TypeNewDetail />
        <TypeNewTime /> */}
        <SelectType/>
      </section>
    </>
  );
};

// ===============카테고리 선택창
const ChooseNewCategory = () => {
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
      <ButtonLarge children="다음" />
    </PaddingWrap>
  );
};
// ============제목작성
const TypeNewTitle = () => {
  const [typedTitle, setTypedTitle] = useState(false);
  return (
    <PaddingWrap>
      <span className="h4 newsocial_title">소셜링 제목을 작성해볼까요?</span>
      <StyledInput
        className="social_title_input"
        type="text"
        onChange={(e) => {
          setTypedTitle(e.target.value);
          if (typedTitle.length > 30) {
            e.target.value = e.target.value.substring(0, 29);
          }
        }}
        placeholder="마음이 맞는 이웃과 소셜링을 진행해보세요"
      />
      <div className="input_length_counter">
        <span>{typedTitle ? typedTitle.length : 0}</span>
        <span className="font_light_gray">/30</span>
      </div>
      <ButtonLarge className={typedTitle ? "" : "disabled"}>다음</ButtonLarge>
    </PaddingWrap>
  );
};
// =====================내용작성
const TypeNewDetail = () => {
  const [typedDetail, setTypedDetail] = useState(false);
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
      <ButtonLarge className={typedDetail ? "" : "disabled"}>다음</ButtonLarge>
    </PaddingWrap>
  );
};
// =====================날짜선택
const TypeNewTime = () => {
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
      <ButtonLarge className={typedTime&&typedDate ? "" : "disabled"}>다음</ButtonLarge>
    </PaddingWrap>
  );
};
// =====================날짜선택
const SelectType = () => {
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
        }}value="오프라인"
      />
      <div className="input_length_counter"></div>
      <ButtonLarge className={selectedType ? "" : "disabled"}>다음</ButtonLarge>
    </PaddingWrap>
  );
};

// ===============단일 소셜링
export const SocialingElement = (props) => {
  return (
    <div className="social_chatting" key={props.id}>
      <img
        src={props.img}
        alt={`${props.title} 대표 이미지`}
        className={props.participant.length===props.maxParticipant?"chatting_profile opacity-50":"chatting_profile"}
      />
      <div className="chatting_title">
        <span className={props.participant.length!==props.maxParticipant?"p bold":"p bold font_light_gray"}>{props.title}</span>
        <span className="h5 fontgray">{props.date}</span>
        <span className="h5 fontgray">{props.location}</span>
        <span className="h5 fontgray">
          {/* {props.maxParticipant - props.participant.length > 0
            ? `${props.maxParticipant - props.participant.length}명 참여가능`
            : "마감된 소셜링"} */}
          {`${props.participant.length}/${props.maxParticipant}`}
        </span>
      </div>
    </div>
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
        <div className="new_social_left">
          <p>{title}</p>
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
const dummyDataForSocial = [
  {
    id: 1,
    title: "주말에 같이 산책하실 분~",
    location: "서울 마포구 합정동",
    img: "http://3.39.181.250/media/storypictures/new_dog1.jpg",
    date: "2022-08-07",
    maxParticipant: 3,
    participant: ["bbomi84", "ruby123", "junguzzang"],
    category: "food",
  },
  {
    id: 2,
    title: "애견동반 영어모임 어떠신가요?",
    location: "서울 용산구 이태원동",
    img: "http://3.39.181.250/media/storypictures/new_dog2.jpg",
    date: "2022-08-01",
    maxParticipant: 6,
    participant: [],
    category: "education",
  },
  {
    id: 3,
    title: "버릇나쁜 우리 강아지? 사회성 기르기",
    location: "서울 강남구 역삼동",
    img: "http://3.39.181.250/media/storypictures/dog1.jpg",
    date: "2022-08-01",
    maxParticipant: 6,
    participant: ["bjungubo", "mi84ng"],
    category: "education",
  },
];

const Category = () => {
  return (
    <div className="category">
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
        className="active"
      >
        전체보기
      </MiniButton>
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
      >
        레스토랑
      </MiniButton>
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
      >
        카페
      </MiniButton>
      <MiniButton
        onClick={(e) => {
          e.target.classList.toggle("active");
        }}
      >
        호텔
      </MiniButton>
    </div>
  );
};
export default Socialing;
