import { useState } from "react";
import { Container, TextWrapper } from "../styles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PwdForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const PwdInput = styled.input``;

export default function WalletPwd() {
  const [pwd, setPwd] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("비밀번호를 설정해주세요.");
  const [submitCount, setSubmitCount] = useState(0);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (submitCount === 0) {
      console.log(pwd);
      setConfirmMsg("비밀번호를 다시 입력해주세요.");
      setSubmitCount(1);
      setPwd("");
    } else {
      navigate(`/walletconfirm`);
    }
  };
  const onChange = (e) => {
    setPwd(e.target.value);
  };
  return (
    <>
      <Container>
        <TextWrapper>{confirmMsg}</TextWrapper>
        <PwdForm onSubmit={onSubmit}>
          <PwdInput
            type="password"
            value={pwd}
            onChange={onChange}
          />
        </PwdForm>
      </Container>
    </>
  );
}
