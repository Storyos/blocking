import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, TextWrapper } from "../styles";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function WalletLogin() {
  const [data,setData] = useState(null);
  const[loading, setLoading] =useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:3001/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err=>{
        setError(err);
        setLoading(false);
      })
  },[]);

  if(loading){
    return <div>Loading..</div>
  }
  if(error){
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Container>
        <TextWrapper>
          <div>부경 Portfoilo</div>
          <div>나만의 서류 지갑을 만들어 보세요.</div>
          <div>{data.message}</div>
          <Link to={`/walletpwd`}>카카오톡으로 간편 로그인</Link>
        </TextWrapper>
      </Container>
    </>
  );
}
