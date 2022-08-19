import { React, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../img/logo.png";
import back from "../img/back.png";
import setting from "../img/setting.png";
import AuthContext from "../context/AuthProvider";
import plus from "../img/plus.png";
import profile from "../img/profile.png";

const HeaderBarUnderLine = styled.header`
  width: 100%;
  border-bottom: 1px solid var(--line-gray);
`;
const HeaderWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 20px 13%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 470px;
    min-width: 330px;
    padding: 20px;
  }
`;
const CenterWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 20px 13%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 470px;
    min-width: 330px;
    padding: 20px;
  }
`;
const IconWrapper = styled.div`
  cursor: pointer;
  width: 70px;
`;
const IconImg = styled.img`
  height: 32px;
  object-fit: cover;
  float: right;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  &div{
    border: 2px solid var(--font-gray);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const UserProfile = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  border: 2px solid var(--font-light-gray);
  float: right;
`

// 타입에는 헤더갯수에 따라 1,2,3 이 있음 / name 은 상단에 표시되는이름 / callback은 우측 아이콘 클릭시 동작
const TopHeader = ({
  type,
  name,
  callBack,
  callBackType = "img",
  callBackImg = "plus",
  callBackText = "",
  callBack2,
  callBackType2 = "img",
  callBackImg2 = "plus",
  callBackText2 = "",
  URL = "#",
  URL2 = "#",
}) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  const gohome = () => {
    navigate("/");
  };
  

  // 3단 헤더

  if (type === "3") {
    return (
      <HeaderBarUnderLine>
        <HeaderWrapper>
          <IconImg
            src={back}
            alt="로고"
            className="header_logo"
            onClick={goback}
          />

          <span className="h3 xbold">{name}</span>

          <Link to={URL}>
            <IconWrapper onClick={callBack}>
              {callBackType === "text" ? (
                <IconImg as="div">{callBackText}</IconImg>
              ) : (
                <IconImg src={callBackImg} alt="새 글쓰기" />
              )}
            </IconWrapper>
          </Link>
        </HeaderWrapper>
      </HeaderBarUnderLine>
    );

    // 2단 헤더
  } else if (type === "2") {
    return (
      <HeaderBarUnderLine>
        <HeaderWrapper>
          <IconImg
            src={back}
            alt="로고"
            className="header_logo"
            onClick={goback}
          />

          <span className="h3 xbold">{name}</span>
          <IconWrapper></IconWrapper>
        </HeaderWrapper>
      </HeaderBarUnderLine>
    );

    // 1단 헤더
  } else if (type === "1") {
    return (
      <HeaderBarUnderLine>
        <CenterWrapper>
          <Link to="/">
            <IconImg src={logo} alt="로고" className="header_logo" />
          </Link>
        </CenterWrapper>
      </HeaderBarUnderLine>
    );
  } else if (type === "4") {
    return (
      <HeaderBarUnderLine>
        <HeaderWrapper>
          <IconImg
            src={logo}
            alt="로고"
            className="header_logo"
            onClick={gohome}
          />

          <span className="h3 xbold">{name}</span>

          <IconContainer>
            <Link to={URL2}>
              <IconWrapper onClick={callBack2}>
                {callBackType2 === "text" ? (
                  <IconImg as="span">{callBackText2}</IconImg>
                ) : (
                  <IconImg
                    src={`../../img/${callBackImg2}.png`}
                    alt="버튼1"
                  />
                )}
              </IconWrapper>
            </Link>

            <Link to={URL}>
              <IconWrapper onClick={callBack}>
                {callBackType === "text" ? (
                  <IconImg as="span">{callBackText}</IconImg>
                ) : (auth.userimage?

                  <UserProfile src={auth.userimage}/> 
                  : <IconImg
                    src={
                      `../../img/${callBackImg}.png`}
                    alt="버튼2"/>
                )}
              </IconWrapper>
            </Link>

          </IconContainer>
        </HeaderWrapper>
      </HeaderBarUnderLine>
    );
  }
};

export default TopHeader;
