import React from "react";
import {
  Link,
  useNavigate,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import "./option.css";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Option = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://3.39.181.250/accounts/logout/", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then(res=>{console.log(res)})

      setAuth({ user: "", pwd: "", accessToken:""});
      navigate(from, { replace: true });

    } catch (err) {
      if (!err?.response) {
        console.log("서버로부터 응답이 없습니다");
      } else if (err.response?.status === 400) {
        console.log("양식이 올바르지 않습니다");
      } else if (err.response?.status === 401) {
        console.log("허가되지않은 접근입니다");
      } else {
        console.log("Logout Failed");
      }
    }
  };

  return (
    <div className="optionWrapper">
      <div className="optionHeader">
        <Link to="/profile">
          <img
            src="../img/back.png"
            alt="뒤로가기"
            className="optionHeaderback"
          ></img>
        </Link>
        <span className="optionHeadername h3 bold">설정</span>
      </div>
      <div className="profileNamecard">
        <img
          src="../img/profileImg.png"
          alt="프로필사진"
          className="profilepicture"
        ></img>
        <div className="namecardInfo">
          <span className="cardBreed">
            말티즈/ 남/ 7세
            <br />
          </span>
          <span className="nickname">
            쫑이98
            <br />
          </span>
          <span className="comment">사료보단 간식이 좋은 쫑이에요</span>
        </div>
        <div className="Browndiv">
          <div className="Whiteholediv"></div>
        </div>
      </div>
      <div className="optionMenu">
        <Link to="/ProfileEdit">
          <div className="profileEditor">
            <img
              src="../img/profile_icon.png"
              alt="프로필편집"
              className="profileEdit"
            ></img>
            프로필편집
          </div>
        </Link>
        <div className="account">
          <img
            src="../img/account.png"
            width="24px"
            alt="계정"
            className="accountEdit"
          ></img>
          계정
        </div>
        <div className="privacy">
          <img
            src="../img/lock.png"
            width="24px"
            alt="프로필편집"
            className="privacyEdit"
          ></img>
          개인정보 보호
        </div>
        <div className="alertOption">
          <img
            src="../img/alert-circle.png"
            width="24px"
            alt="프로필편집"
            className="alertEdit"
          ></img>
          알림 설정
        </div>
        <div className="cs">
          <img
            src="../img/question-circle.png"
            width="24px"
            alt="프로필편집"
            className="csEdit"
          ></img>
          고객센터 / 도움말
        </div>
        <div className="logout" onClick={handleLogOut}>
          <img
            src="../img/logout.png"
            width="24px"
            alt="로그아웃"
            className="logoutEdit"
          ></img>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default Option;
