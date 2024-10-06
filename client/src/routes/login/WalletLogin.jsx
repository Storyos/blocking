import styled from "styled-components";
import { useEffect, useRef } from "react";
// import { useEffect, useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: bold;
  font-size: 28px;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* 로그인 버튼과 회원가입 버튼 사이의 간격 */
  margin-top: 300px;
`;

const Btn = styled.button`
  width: 220px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #50c2c9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-size: 14px;
  color: white;

  a {
    color: white; /* a 태그의 글자색도 흰색으로 */
    text-decoration: none;
  }

  &:hover {
    background-color: #3ba9b1;
`;

export default function WalletLogin() {
  // const popupRef = useRef(null);

  // const openPopup = async () => {
  //   if (isMobile) {
  //     // 모바일의 경우 앱 바로가기
  //     // 이부분 Test할때 본인 ip로 변경필요
  //     const response = await axios.get("http://192.168.0.10:4000/api/klip/prepareMobile");
  //     console.log("response :>> ", response.data.deeplink);
  //     window.location.href = response.data.deeplink;
  //     // 앱이 설치돼 있지 않으면 스토어로 링크
  //     setTimeout(() => {
  //       const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //       if (/android/i.test(userAgent)) {
  //         window.location.href =
  //           "https://play.google.com/store/apps/details?id=com.klipwallet.app&pcampaignid=web_share";
  //       } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //         window.location.href = "itms-apps://apps.apple.com/kr/app/%ED%81%B4%EB%A6%BD-klip/id1627665524";
  //       }
  //     }, 2000);
  //   } else {
  //     // PC의 경우 QR 팝업 띄움
  //     popupRef.current = window.open("/KlipLogin", "_blank", "width=600,height=600");

  //     const checkPopupClosed = setInterval(() => {
  //       if (popupRef.current && popupRef.current.closed) {
  //         clearInterval(checkPopupClosed);
  //         window.location.href = "/WalletPwd";
  //       }
  //     }, 500);
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     if (popupRef.current && !popupRef.current.closed) {
  //       popupRef.current.close();
  //     }
  //   };
  // }, []);

  return (
    <Container>
      <TextWrapper>
        <div>부경 Portfoilo로</div>
        <div>쉽게 만드는</div>
        <div>나만의 서류 지갑</div>
      </TextWrapper>

      <ButtonWrapper>
        <Btn>
          <Link to="/login">로그인하기</Link>
        </Btn>
        <Btn>
          <Link to="/signup">회원가입</Link>
        </Btn>
      </ButtonWrapper>
    </Container>
  );
}
