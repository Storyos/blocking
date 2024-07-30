import styled from "styled-components";
import { useEffect, useRef } from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 140px;
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
const LoginBtn = styled.button`
  width: 330px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #50c2c9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  cursor: pointer;

  font-size: 14px;
  color: white;
  font-weight: 500;
`;

export default function WalletLogin() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/data")
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div>Loading..</div>;
  // }
  // if (error) {
  //   return <div>Error: {errogit r.message}</div>;
  // }

  const popupRef = useRef(null);

  const openPopup = () => {
    popupRef.current = window.open("/KlipLogin", "_blank", "width=600,height=600");

    const checkPopupClosed = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        clearInterval(checkPopupClosed);
        window.location.href = "/WalletPwd";
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <Container>
        <TextWrapper>
          <div>부경 Portfoilo로</div>
          <div>쉽게 만드는</div>
          <div>나만의 서류 지갑</div>
          {/* <div>{data.message}</div> */}
        </TextWrapper>
        <LoginBtn onClick={openPopup}>클립으로 간편 로그인</LoginBtn>
      </Container>
    </>
  );
}
