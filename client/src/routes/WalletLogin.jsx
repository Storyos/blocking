import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 450px;
  font-size: 15px;
  overflow: hidden;
`;
const TextWrapper = styled.div`
  text-align: center;
`;
const LoginBtn = styled.div`
  width: 250px;
  height: 40px;
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const LoginLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <Container>
        <TextWrapper>
          <div>부경 Portfoilo</div>
          <div>나만의 서류 지갑을 만들어 보세요.</div>
          {/* <div>{data.message}</div> */}
        </TextWrapper>
        <LoginBtn>
          <LoginLink to={`/walletpwd`}>클립으로 간편 로그인</LoginLink>
          {/* QR코드 새창 띄우기 */}
        </LoginBtn>
      </Container>
    </>
  );
}
