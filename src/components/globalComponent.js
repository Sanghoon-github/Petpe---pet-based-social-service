import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import TopHeader from "./TopHeader";

// 최상단 헤더
export const Header = () => {
  return (
    <div className="header">
      <div className="social_header">
        <div className="social_title_back">
          <img src="../img/back.png" alt="뒤로가기"></img>
        </div>
        <span className="social_title h3 bold">소셜링</span>
        <div className="social_title_add">
          <img src="../img/plus.png" alt="소셜링 열기"></img>
        </div>
      </div>
    </div>
  );
};

// ===========라디오버튼 네비게이터
export const RadioNavigater = () => {
  return (
    <nav className="radioNav">
      <NavLink to="/">
        <div className="radioNavButton">스토리</div>
      </NavLink>
      <NavLink to="/social">
        <div className="radioNavButton">소셜링</div>
      </NavLink>
      <NavLink to="/place">
        <div className="radioNavButton">플레이스</div>
      </NavLink>
      {/* <NavLink to="/talktalk">
        <div className="radioNavButton">반려톡톡</div>
      </NavLink> */}
    </nav>
  );
};
// 모바일 래퍼
export const MobileWrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 470px;
  min-width: 330px;
  border: 1px solid var(--line-gray);
  padding: 20px;
`;

// 버튼컴포넌트
const ButtonLarge = styled.div`
  min-width: 300px;
  width: 100%;
  height: 46px;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #a68762;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &.disabled {
    background-color: #f2f2f2;
    color: #737373;
  }
  &.ghost {
    border: 2px solid #a68762;
    color: #a68762;
    background-color: #fff;
  }
`;
export const ButtonMedium = styled.div`
  min-width: 150px;
  width: 50%;
  height: 46px;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #a68762;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &.disabled {
    background-color: #f2f2f2;
    color: #737373;
  }
  &.ghost {
    border: 2px solid #a68762;
    color: #a68762;
    background-color: #fff;
  }
`;

export const StyledInput = styled.input`
  border-bottom: 1px solid var(--font-black);
  width: 100%;
`;

// 존재하지 않는 페이지 (에러페이지)
export const WrongPage = () => {
  return (
    <WrongPageWrapper>
      <TopHeader type="1"></TopHeader>
      <Link to="/">홈으로 가기</Link>
    </WrongPageWrapper>
  );
};

export const WrongPageWrapper = styled.section`
  margin: 0 auto;
  min-width: 330px;
  max-width: 440px;
  width: 50%;
  padding: 20px;
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SkeletonImg = styled.div`
  width: 100%;
  height: 360px;
  background-color: var(--background-gray);
  &.smallimg {
    width: 150px;
    height: 100px;
  }
`;

const SkeletonText = styled.div`
  width: 30%;
  height: 24px;
  margin: 5px 0;
  background-color: var(--background-gray);
  &.large {
    width: 50%;
  }
  &.circle {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    margin-right: 10px;
  }
`;
const SkeletonWrap = styled.div`
  width: 100%;
  max-width: 470px;
  min-width: 330px;
  height: 100px;
`;

export const SocialSkeleton = () => {
  <SkeletonWrap>
    <SkeletonImg className="smallimg" />
    <div className="chatting_title">
      <SkeletonText className="large" />
      <SkeletonText />
    </div>
  </SkeletonWrap>;
};

export const StorySkeleton = () => {
  return (
    <div className="story">
      <div className="userProfileWrapper">
        <SkeletonText className="circle" />
        <SkeletonText />
      </div>
      <div className="imgWrapper">
        <SkeletonImg />
      </div>
      <div className="storyInteractionWrapper">
        <div className="icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5161 4.3174C19.2058 3.50509 18.7584 2.76898 18.1988 2.15028C17.6389 1.52974 16.9787 1.0366 16.2542 0.697681C15.5029 0.344851 14.6971 0.164253 13.8835 0.16637C12.7422 0.16637 11.6286 0.519705 10.6609 1.18712C10.4294 1.34677 10.2095 1.52213 10.0011 1.71319C9.79279 1.52213 9.57286 1.34677 9.34135 1.18712C8.37364 0.519705 7.26009 0.16637 6.11876 0.16637C5.2969 0.16637 4.50052 0.344346 3.74811 0.697681C3.02118 1.03793 2.36601 1.52736 1.80345 2.15028C1.24319 2.76828 0.795642 3.50457 0.486167 4.3174C0.164371 5.16279 0 6.06052 0 6.98443C0 7.85599 0.157426 8.76419 0.469961 9.6881C0.731565 10.4602 1.10661 11.2611 1.58583 12.0698C2.34518 13.3497 3.38928 14.6845 4.68572 16.0377C6.83412 18.2807 8.96167 19.8301 9.05196 19.8929L9.60064 20.2908C9.84372 20.4661 10.1563 20.4661 10.3993 20.2908L10.948 19.8929C11.0383 19.8275 13.1635 18.2807 15.3143 16.0377C16.6107 14.6845 17.6548 13.3497 18.4141 12.0698C18.8934 11.2611 19.2707 10.4602 19.53 9.6881C19.8425 8.76419 20 7.85599 20 6.98443C20.0023 6.06052 19.8379 5.16279 19.5161 4.3174V4.3174ZM10.0011 18.2205C10.0011 18.2205 1.75946 12.2504 1.75946 6.98443C1.75946 4.3174 3.71107 2.15552 6.11876 2.15552C7.81108 2.15552 9.27884 3.22337 10.0011 4.78328C10.7235 3.22337 12.1912 2.15552 13.8835 2.15552C16.2912 2.15552 18.2428 4.3174 18.2428 6.98443C18.2428 12.2504 10.0011 18.2205 10.0011 18.2205Z"
              fill="#737373"
            />
          </svg>
        </div>
      </div>
      <div className="storyDetailWrapper">
        <span className="story_content">
          <SkeletonText />
        </span>
        <div className="story_comments_wrapper">
          <SkeletonText className="large" />
        </div>

        <div className="postedDate h5 fontgray mt-5skeleton"></div>
      </div>
    </div>
  );
};

export default ButtonLarge;
