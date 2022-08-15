import React, { useState } from "react";
import MiniButton from "../components/minibutton";
import "./Place.css";
import TopHeader from "../components/TopHeader";
import { RadioNavigater } from "../components/globalComponent";


const Place = () => {
  return (
    <>
    <TopHeader type="2" name="플레이스"/>
    <RadioNavigater/>
      <div className="place_wrapper">
        <div className="search_box">
          <input type="text" className="search" placeholder=" 검색" />
        </div>

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
        <div className="arrow_array">
          <span className="array">정확도순/ 거리순</span>
          <div className="arrow_btn">
            <img src="./img/arrow.png" alt="정렬"></img>
          </div>
        </div>
        <PlaceElement></PlaceElement>
        <PlaceElement></PlaceElement>
        <PlaceElement></PlaceElement>
        <PlaceElement></PlaceElement>
        <PlaceElement></PlaceElement>
      </div>
    </>
  );
};

export const PlaceElement = () => {
  return (
    <>
      <div className="info">
        <img
          src="http://placeimg.com/100/100/people"
          alt="/이미지"
          className="info_profile"
        />
        <div className="place_info">
            <span className="place_name h4">댕댕병원</span>
            <div className="place_grade">
              <div className="grade">
                <img src="./img/rate.png" alt="평점" className="rate_img"/>
                <span className="rate">4.23</span> 
                <span className="time">09:00 ~ 18:00 (일 휴무)</span>
                <span className="parking">주차가능</span>
              </div>
            </div>
            <span className="location">
                부평구청 뒤 해밀턴 호텔에서 300미터 직진
            </span>
          </div>
      </div>
    </>
  );
};






export default Place;
