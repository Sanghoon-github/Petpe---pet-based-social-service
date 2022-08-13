import React, { useState, useEffect } from "react";
import "./story.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../node_modules/axios/index";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopHeader from "../components/TopHeader";
import { RadioNavigater } from "../components/globalComponent";

const Story = () => {
  // 처음 랜더링때 화면표시용
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [story, setStory] = useState([]);
  useEffect(() => {
    //   let isMounted = true;
    //   const controller = new AbortController();

    //   const getStory = async () => {
    //     try {
    //         const response = await axiosPrivate.get('/story', {
    //             signal: controller.signal
    //         });
    //         console.log(response.data);
    //         isMounted && setStory(response.data);
    //     } catch (err) {
    //         console.error(err);
    //         navigate('/login', { state: { from: location }, replace: true });
    //     }
    // }

    // getStory();

    // return () => {
    //     isMounted = false;
    //     controller.abort();
    // }

    axios.get("http://3.39.181.250/story").then((response) => {
      setStory(response.data);
    });
  }, []);

  // 새로고침용 함수
  const updateStories = () => {
    axios.get("http://3.39.181.250/story").then((response) => {
      setStory(response.data);
    });
  };

  return (
    <>
      <TopHeader />
      <RadioNavigater />
      <section className="storyWrapper">
        {story.map((props) => {
          return StoryEle(props);
        })}
        <button onClick={updateStories}>더보기</button>
      </section>
    </>
  );
};

export const StoryEle = (props) => {
  return (
    <div className="story" key={props.id}>
      <div className="userProfileWrapper">
        <div className="userProfile-sm">
          <img src={props.userimage} alt={props.userName + "의 프로필사진"} />
          <div>
            <span className="p">
              {props.useremail.substr(0, props.useremail.indexOf("@"))}
            </span>
            <span className="h5 fontgray">{props.username}</span>
          </div>
        </div>
      </div>
      <div className="imgWrapper">
        <Slider
          key={"slider" + props.id}
          dots={true}
          infinite={true}
          speed={300}
          slidesToShow={1}
          slidesToScroll={1}
          className="slider"
        >
          {props.pictures.map((e) => {
            return (
              <img
                src={e.picture}
                alt={props.username + "의 사진"}
                key={props.pictures.indexOf(e)}
              />
            );
          })}
        </Slider>
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
        <span className="liked">junguZzang 외 6명</span>
        <span className="content">{props.content}</span>
        <span className="taggedUser h5">{props.hashTag}</span>
        <input type="text" placeholder="댓글을 입력하세요" />
        <span className="postedDate h5 fontgray">
          {new Date(props.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default Story;
