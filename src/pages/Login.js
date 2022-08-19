import "./Login.css";
import React, { useState, useRef, useEffect } from "react";
import Container from "../components/container";
import {
  Link,
  useNavigate,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import ButtonLarge from "../components/globalComponent";
import Register from "./register";

import useAuth from "../hooks/useAuth";
import axios from "../../node_modules/axios/index";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const Login = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();
  const userIdRef = useRef();
  const emailcheckbox = useRef();

  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();
  const [errMsg, setErrMsg] = useState("");

  const errorAlerterRef = useRef();

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  
  // 로그인 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://3.39.181.250/accounts/login/",
        JSON.stringify({ username: "", email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const userimage = response?.data?.user?.userimage;
      const pk = response?.data?.user?.pk

      setAuth({ user: user, pwd: pwd, accessToken: accessToken, userimage:userimage, refreshToken:refreshToken, pk:pk });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("서버로부터 응답이 없습니다");
      } else if (err.response?.status === 400) {
        setErrMsg("이메일 또는 패스워드를 확인해주세요");
      } else if (err.response?.status === 401) {
        setErrMsg("허가되지않은 접근입니다");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  // 유효성검사함수
  const handleId = (e) => {
    userIdRef.current.focus();
    let email =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    if (email.test(e.target.value)) {
      errorAlerterRef.current.textContent = "";
      setUser(e.target.value);
    } else {
      errorAlerterRef.current.textContent = "올바른 이메일을 입력해주세요";
      setUser(false);
    }
  };

  //비밀번호 유효성 검사
  const handlePw = (e) => {
    //  8 ~ 10자 영문, 숫자 조합
    let password = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // 형식에 맞는 경우 true 리턴
    if (password.test(e.target.value)) {
      errorAlerterRef.current.textContent = "";
      //비번이 맞을시, pw검사 state를 true로
      setPwd(e.target.value);
    } else {
      errorAlerterRef.current.textContent = "8자리 이상의 영문, 숫자, 특수문자";

      //비번이 틀릴시, pw검사 state를 false로
      setPwd(false);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <div className="login_Wrapper">
                <header>
                  <Link to={"/"}>
                    <h1>
                      <img src="../img/logo.png" alt="petpe_logo" />
                    </h1>
                  </Link>
                </header>

                <form method="post" action="#">
                  <div className="input_wrapper">
                    <input
                      ref={userIdRef}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="이메일주소를 입력해 주세요"
                      autoComplete="username"
                      onChange={handleId}
                    />
                  </div>
                  <div className="input_wrapper">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="current-password"
                      onChange={handlePw}
                    />
                  </div>
                  <div className="LoginOptionWrap">
                    <div id="keepLoginOption">
                      <input type="checkbox" name="keepLoginCheckBox" ref={emailcheckbox}/>
                      <label
                        htmlFor="keepLoginCheckBox"
                        id="keepLoginLabel"
                        className="fontgray"
                      >
                        이메일 저장
                      </label>
                    </div>
                    <div id="registerOptionWrap">
                      <span id="findUserID" className="fontgray">
                        ID/PW 찾기
                      </span>
                      <Link
                        to="/login/register"
                        id="signUp"
                        className="font_deep_brown bold"
                      >
                        회원가입
                      </Link>
                    </div>
                  </div>
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <div id="errorAlerter" ref={errorAlerterRef}></div>

                  {/* 조건부 링크 */}
                  <ButtonLarge
                    as="input"
                    type="submit"
                    className={user && pwd ? "" : "disabled"}
                    value="로그인"
                    onClick={handleSubmit}
                  ></ButtonLarge>
                </form>
              </div>
            </Container>
          }
        />

        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Login;
