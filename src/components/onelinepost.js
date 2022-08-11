import styled from "styled-components";

//한문장포스트_컴포넌트
const OneLinePost = styled.div`
    //약속
    width: 100%;
    max-width: 470px;
    min-width: 330px;
    //
    height: 60px;
    padding: 20px;
    margin: 0 auto;
    border-bottom: 1px solid #F2F2F2;
    
    &.centeralign{
        text-align: center;
    }
`;

export default OneLinePost;