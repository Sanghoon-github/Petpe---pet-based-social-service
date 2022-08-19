import Slider from "react-slick";
import { React, useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TopHeader from "./../components/TopHeader";
import MiniButton from './../components/minibutton';

const StoryDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [story, setStory] = useState([]);
  const [comment,setComment]=useState()
  const userkey = useParams();

  const handleSubmit=()=>{
    if(story!==undefined)
    axios.post(`http://3.39.181.250/comments/`,
    {
      headers: { "Content-Type": "application/json" },
      body:{ "text": String(comment), "story": Number(userkey.id) },
      withCredentials: true
    }
    )
    .then((response) => {
      console.log(response)
    });
  }
  

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://3.39.181.250/story/${userkey.id}`).then((response) => {
      setStory(response.data);
      console.log(response.data)
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <TopHeader type="1" />;
  } else
    return (
      <>
        <TopHeader type="1" />
        <div className="story_detail_background">
          <div className="story_detail_wrapper">
            <section className="story_detail">
              <div className="userProfileWrapper">
                <div className="userProfile-sm">
                  <img
                    src={story.userimage}
                    alt={story.username + "의 프로필사진"}
                  />
                  <div>
                    <span className="p bold">
                      {story.useremail.substr(0, story.useremail.indexOf("@"))}
                    </span>
                    <span className="h5 fontgray">{story.username}</span>
                  </div>
                </div>
              </div>
              <div className="imgWrapper">
                <Slider
                  key={"slider" + story.id}
                  dots={true}
                  infinite={true}
                  speed={300}
                  slidesToShow={1}
                  slidesToScroll={1}
                  className="slider"
                >
                  {story.pictures.map((e) => {
                    return (
                      <img
                        src={e.picture}
                        alt={story.username + "의 사진"}
                        key={story.pictures.indexOf(e)}
                        className="slick_inner_img"
                      />
                    );
                  })}
                </Slider>
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
              </div>
            </section>

            <section className="story_deatil_comments_wrapper">
              <div className="storyDetailWrapper">
                {/* <span className="story_liked h5">junguZzang 외 6명</span> */}
                <span className="story_content">
                  <span className="xbold mr-5">{story.username}</span>
                  {story.content}
                </span>
                <div className="story_comments_wrapper mt-10">
                  {story.comments.map((e) => {
                    return (
                      <div className="storyComment" key={e.id}>
                        <img
                          src={e.author_userimage}
                          alt={e.authername + "의 프로필사진"}
                          className="comment_userProfile"
                        />
                        <span className="mr-10 xbold p">
                          {e.author_username}
                        </span>
                        <span className="storyContent p">{e.text}</span>
                      </div>
                    );
                  })}
                </div>

                <span className="postedDate h5 fontgray mt-5">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="new_comment_input_wrapper">
                <input
                  type="text"
                  className="mt-10 comment_input"
                  placeholder="댓글을 입력하세요"
                  onChange={(e)=>{
                    setComment(e.target.value)
                  }}
                />
                <button className={comment?"comment_submit_button active":"comment_submit_button"}
                onClick={handleSubmit}>제출</button>
              </div>
            </section>
          </div>
        </div>
      </>
    );
};

export default StoryDetail;
