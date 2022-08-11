import styled from "styled-components";

//토글버튼_컴포넌트
const ToggleSliderButton = styled.div`
body{
/*그냥 버튼 가운데로 위치 시킨 것*/
    display: flex;
    justify-content:center;
    align-items: center;
    height: 100vh;
}
    
#toggle-slider{display: none;}    
    
label{
    cursor:pointer;
    width: 36px;
    height: 20px;
    text-indent: -9999em;
    background: #F2F2F2;

    border: 1px;
    border-style: solid;
    border-color: #A5A5A5;
    border-radius:20px;

    position: relative;
    /*기준 잡기*/
    
    transition: 0.4s ease-out;
}

/*동그라미 버튼*/
label:before{
    /* before 나 after로 만든건
    모두 inline요소이다 */
    content:'';
    width: 14px;
    height: 14px;
    background: #A5A5A5;
    position: absolute;
    border-radius: 50%;
    top:3px;
    left:3px;
    transition: 0.4s ease-out;
}

/*클릭한 후 모션*/
#toggle-slider:checked + label{
    background: #A68762;
}
#toggle-slider:checked + label:before{
    background: #F8F8F8;
    left: 20px;
}
`;

export default ToggleSliderButton;