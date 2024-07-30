import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const TextWrapper = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 120px;
`;

const PwdForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PwdDisplay = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  color: #50c2c9;
`;

const PwdBox = styled.div`
  width: 35px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-weight: bold;

  border-radius: 10px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const Keypad = styled.div`
  display: grid;
  width: 340px;
  padding: 10px;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background-color: #50c2c9;
  position: absolute;
  bottom: 0;
`;

const Key = styled.button`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: white;

  &.Delete {
    font-size: 19px;
  }
  &.AllDelete {
    font-size: 16px;
  }
`;

export default function WalletPwd() {
  const [pwd, setPwd] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("비밀번호를 설정해주세요.");
  const [submitCount, setSubmitCount] = useState(0);
  const navigate = useNavigate();

  const onSubmit = () => {
    if (submitCount === 0) {
      setConfirmMsg("비밀번호를 다시 입력해주세요.");
      setSubmitCount(1);
      setPwd("");
    } else {
      navigate(`/walletconfirm`);
    }
  };

  const onKeyPress = (key) => {
    if (pwd.length < 6) {
      const newPwd = pwd + key;
      setPwd(newPwd);

      if (newPwd.length === 6) {
        onSubmit();
      }
    }
  };

  const onDelete = () => {
    setPwd(pwd.slice(0, -1));
  };

  const onClear = () => {
    setPwd("");
  };

  return (
    <Container>
      <TextWrapper>{confirmMsg}</TextWrapper>
      <PwdForm onSubmit={(e) => e.preventDefault()}>
        <PwdDisplay>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <PwdBox key={index}>{pwd[index] ? "*" : ""}</PwdBox>
            ))}
        </PwdDisplay>
      </PwdForm>
      <Keypad>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
          <Key
            key={key}
            onClick={() => onKeyPress(key.toString())}
          >
            {key}
          </Key>
        ))}
        <Key
          onClick={onDelete}
          className="Delete"
        >
          ⌫
        </Key>
        <Key
          onClick={onClear}
          className="AllDelete"
        >
          전체삭제
        </Key>
      </Keypad>
    </Container>
  );
}
