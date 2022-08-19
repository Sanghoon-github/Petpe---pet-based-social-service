import React, { useState, useEffect } from "react";
import Container from "../components/container";
import Option from "./option";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./profile.css";
import useAuth from "../hooks/useAuth";
import TopHeader from "./../components/TopHeader";
import { MobileWrapper } from "./../components/globalComponent";
import axios from "../../node_modules/axios/index";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";

const Profile = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get(`http://3.34.21.153/accounts/user/${auth.pk}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
          "Access-Control-Allow-Credentials": "*",
        })
        .then((response) => {
          setUserDetail(response.data);
          console.log(response.data);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading("err");
    }
  }, []);
if(isLoading){
  return (<TopHeader type="4" URL2="/profile/option" callBackImg2="setting" />)
}else
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <TopHeader type="4" URL2="/profile/option" callBackImg2="setting" />
            <MobileWrapper>
              <div className="profileCard">
                <img
                  src={auth.userimage}
                  alt="프로필사진"
                  className="profileImage"
                ></img>
                <div className="profileInfo">
                  {/* <span className="cardBreed">
                    말티즈/ 남/ 7세
                    <br />
                  </span> */}
                  <span className="p xbold">
                    {userDetail.username}
                    <br />
                  </span>
                  <span className="comment">{userDetail.email.substr(0, userDetail.email.indexOf("@"))}</span>
                </div>
              </div>
              <div className="userInfo">
                <div className="bold">게시물</div>
                <div>{userDetail.writen_story.length}</div>
              </div>
              <button className="Writting">글쓰기</button>
              <div className="mt-10 bold">게시물</div>
              <div className="presentpicture">
                {userDetail.writen_story.map((e) => {
                  return (
                    <img
                      src={e.pictures[0].picture}
                      alt="예시사진"
                      className="exPicture"
                      key={e.id}
                      onClick={(()=>{navigate(`/story/${e.id}`)})}
                    ></img>
                  );
                })}
              </div>
            </MobileWrapper>
          </>
        }
      />
      <Route path="/option" element={<Option />} />
    </Routes>
  );
};

export default Profile;
