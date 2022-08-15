import React, { useState } from "react";
import Container from "../components/container";
import { Link } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import { RadioNavigater } from "../components/globalComponent";

const TalkTalk = () => {
  return (
    <>
  <TopHeader/>
  <RadioNavigater/>
      <Container>
        <h1>talktalk</h1>
      </Container>
    </>
  );
};

export default TalkTalk;
