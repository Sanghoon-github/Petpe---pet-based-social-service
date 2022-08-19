import React, { useState, useEffect, ReactDOM } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./pages/RequireAuth";
import { WrongPage, RadioNavigater } from "./components/globalComponent";

import Login from "./pages/Login";
import Story from "./pages/Story";
import Socialing from "./pages/socialing";
import TalkTalk from "./pages/talktalk";
import Profile from "./pages/profile";
import Place from "./pages/place";
import Layout from "./pages/Layout";
import Newsocialing from "./pages/socialing"
import NewStory from './pages/storyupdate';
import Account from "./pages/account";


function App() {
  return (
    <Routes path="/" element={<Layout />}>
      {/* public Routes */}
      <Route path="/" element={<Story />} />
      <Route path="/story/*" element={<Story />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/social/*" element={<Socialing />} />
      <Route path="/talktalk/" element={<TalkTalk />} />
      <Route path="/place/" element={<Place />} />
      <Route path="/account/*" element={<Account />} />

      {/* need to protect */}
      <Route element={<RequireAuth />}>
        <Route path="/profile/*" element={<Profile />} />
      </Route>

      {/* catch up (오류) */}
      <Route path="*" element={<WrongPage />} />
    </Routes>
  );
}

export default App;
