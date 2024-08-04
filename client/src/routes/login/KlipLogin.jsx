import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const DEFAULT_QR_CODE = 'DEFAULT';
const DEFAULT_ADDRESS = '0x00000000000000000000000000000';

function KlipLogin() {
  const [qrvalueAuth, setQrvalueAuth] = useState(DEFAULT_QR_CODE);
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserData = async () => {
    try {
      const prepareResponse = await axios.post('http://localhost:4000/api/klip/prepare');
      const { requestKey, qrUrl } = prepareResponse.data;
      setQrvalueAuth(qrUrl);

      const timerId = setInterval(async () => {
        const resultResponse = await axios.get(`http://localhost:4000/api/klip/result/${requestKey}`);
        if (resultResponse.data.result) {
          const { klaytn_address: address } = resultResponse.data.result;
          setMyAddress(address);
          setIsLoggedIn(true); // 사용자가 로그인되었음을 표시
          clearInterval(timerId);
          setQrvalueAuth(DEFAULT_QR_CODE);
        }
      }, 1000);
    } catch (error) {
      console.error('Failed to get user data', error);
    }
  };

  const handleLogout = () => {
    setMyAddress(DEFAULT_ADDRESS);
    setIsLoggedIn(false); // 로그아웃 상태로 변경
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          <>
            <button onClick={getUserData}>지갑 연동하기</button>
            {qrvalueAuth !== DEFAULT_QR_CODE && (
              <div
                style={{
                  backgroundColor: 'white',
                  width: 300,
                  height: 300,
                  padding: 20,
                }}
              >
                <QRCode value={qrvalueAuth} size={256} style={{ margin: 'auto' }} />
                <br />
                <br />
              </div>
            )}
          </>
        ) : (
          <div>
            <p>환영합니다! 지갑 주소: {myAddress}</p>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default KlipLogin;
