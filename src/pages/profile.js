import React, { useState } from "react";
import Container from "../components/container";
import Option from "./option";
import { Link,Route,Routes } from "react-router-dom";
import "./profile.css";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  console.log(auth.user);
  return (

    <Routes>
      <Route path="/" element={
      <div className="profileWrapper">
        <div className="profileHeader">
          <Link to="/">
            <img
              src="./img/Petpe_small.png"
              alt="로고"
              className="headerLogo"
            />
          </Link>
          <div className="headerIcon">
            <img src="./img/alert.png" alt="알림" className="headerAlert" />
            <img
              src="./img/calender.png"
              alt="캘린더"
              className="headerCalender"
            />
            <Link to="/profile/option">
              <img src="./img/option.png" alt="설정" className="options" />
            </Link>
          </div>
        </div>
        <div className="profileCard">
          <img
            src="./img/profileImg.png"
            alt="프로필사진"
            className="profileImage"
          ></img>
          <div className="profileInfo">
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
        </div>
        <div className="userInfo">
          <div className="posting">게시물</div>
          <div className="follower">팔로워</div>
          <div className="following">팔로잉</div>
          <button className="Writting">글쓰기</button>
        </div>
        <div className="presentpicture">
          <span className="presentpicturecomment">대표사진</span>
          <div className="presentGallery">
            <img
              src="./img/profile_img1.jpg"
              alt="예시사진"
              className="exPicture"
            ></img>
            <img
              src="./img/profile_img2.jpg"
              alt="예시사진2"
              className="exPicture2"
            ></img>
            <img
              src="./img/profile_img2.jpg"
              alt="예시사진2"
              className="exPicture2"
            ></img>
            <img
              src="./img/profile_img2.jpg"
              alt="예시사진2"
              className="exPicture2"
            ></img>
          </div>
        </div>
      </div>}/>
      <Route path="/option" element={<Option/>} />

      </Routes>
  );
};

export default Profile;
