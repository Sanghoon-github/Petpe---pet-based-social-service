import React from 'react';
import { Navigate } from 'react-router-dom';
import Link from "react-router-dom";

const ProfileEdit = () => {
    return (
        <div>
            <div className="profileEditheader">
                <Link to="/option">
                    <img src="./img/back.png" alt="뒤로가기" className="optionHeaderback"></img>
                </Link>
                
                <span className="profileEditheader h3 bold">설정</span>
            </div>
        </div>
    );
};

export default ProfileEdit;