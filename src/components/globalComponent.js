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
      <NavLink to="/talktalk">
        <div className="radioNavButton">반려톡톡</div>
      </NavLink>
    </nav>
  );
};

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

const WrongPageWrapper = styled.section`
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

export default ButtonLarge;
