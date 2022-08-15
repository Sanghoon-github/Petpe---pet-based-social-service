import Container from "../components/container";
import React, { useState, useRef, useEffect } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "../../node_modules/axios/index";
import "./Register.css";


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();
  const userIdRef = useRef();

  const [userEmail, setUserEmail] = useState();
  const [pword, setPword] = useState();
  const [pwordcheck, setPwordcheck] = useState();
  const [userNickname, setuserNickname] = useState();
  const [errMsg, setErrMsg] = useState("");

  const errorAlerterRef = useRef();

  useEffect(() => {
    userIdRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail, pword, pwordcheck, userNickname]);


  // 회원가입 제출 함수
  const handleJoin = async (e) => {
    e.preventDefault();
    console.log({ username: userNickname, email: userEmail, password1: pword, password2: pword, userimage:null})
    try {
      await axios.post(
        "http://3.39.181.250/accounts/registration/",
        JSON.stringify({ username: userNickname, email: userEmail, password1: pword, password2: pword, userimage:null}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      
      setUserEmail("");
      setPword("");
      setPwordcheck("");
      setuserNickname("");
      navigate(from, { replace: true });
    }

    catch (err) {
      errRef.current.focus();
    }
  };

  // 유효성검사함수
  const handleEmail = (e) => {
    let email =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    if (email.test(e.target.value)) {
      errorAlerterRef.current.textContent = "성공";
      setUserEmail(e.target.value);
    } 
    else {
      errorAlerterRef.current.textContent = "올바른 이메일을 입력해주세요";
      setUserEmail(false);
    }
  };

  //비밀번호 유효성 검사
  const handlePassword = (e) => {
    //  8 ~ 10자 영문, 숫자 조합
    let password = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // 형식에 맞는 경우 true 리턴
    if (password.test(e.target.value)) {
      errorAlerterRef.current.textContent = "";
      //비번이 맞을시, pw검사 state를 true로
      setPword(e.target.value);
    } 
    else {
      errorAlerterRef.current.textContent = "8자리 이상의 영문, 숫자, 특수문자";

      //비번이 틀릴시, pw검사 state를 false로
      setPword(false);
    }
  };

  const handlePasswordcheck = (e) => {
    //  8 ~ 10자 영문, 숫자 조합
    let password = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // 형식에 맞는 경우 true 리턴
    if (password.test(e.target.value)===pword) {
      errorAlerterRef.current.textContent = "";
      //비번이 맞을시, pw검사 state를 true로
      setPwordcheck(e.target.value);
    } 
    else {
      errorAlerterRef.current.textContent = "비밀번호가 일치하지 않습니다.";

      //비번이 틀릴시, pw검사 state를 false로
      setPwordcheck(false);
    }
  };

  const handleNickname = (e) =>{
    let Nickname = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // 형식에 맞는 경우 true 리턴
    if (Nickname.test(e.target.value)) {
      errorAlerterRef.current.textContent = "";
      //비번이 맞을시, pw검사 state를 true로
      setuserNickname(e.target.value);
    } 
    else {
      errorAlerterRef.current.textContent = "8자리 이상의 영문, 숫자, 특수문자";

      //비번이 틀릴시, pw검사 state를 false로
      setuserNickname(false);
    }
  }

    return (
      <Container>
        <div className="joinWrapper">
            <h2 className="h2 bold joinheader">회원가입</h2>

            <form method="post" action="#">
              <div className="textForm"> 
                <input className="joinId" ref={userIdRef} type="text" name="email" id="email" placeholder="이메일" onChange={handleEmail}/>
              </div>
              <div className="textForm"> 
                <input className="joinpw" type="password" name="password" id="password" placeholder="비밀번호" onChange={handlePassword}/>
              </div>
              <div className="textForm"> 
                <input className="joinpwcheck" type="password" name="passwordcheck" id="passwordcheck" placeholder="비밀번호 확인" onChange={handlePasswordcheck}/>
              </div>
              <div className="textForm"> 
                <input className="joinNickname" type="text" name="Nickname" id="Nickname" placeholder="닉네임"onChange={handleNickname}/>
              </div>
              <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
              <div id="errorAlerter" ref={errorAlerterRef}></div>
              <input type="submit" className="btn" value="회원가입" onClick={handleJoin}/>
            </form>
        </div>
      </Container>
        
    );
};

export default Register;