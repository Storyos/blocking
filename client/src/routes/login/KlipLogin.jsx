import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const DEFAULT_QR_CODE = 'DEFAULT';
const DEFAULT_ADDRESS = '0x00000000000000000000000000000';

function KlipLogin() {
  const [qrvalueAuth, setQrvalueAuth] = useState(DEFAULT_QR_CODE);
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const POLLING_INTERVAL = 2000; // 폴링 간격 (2초)
  const MAX_ATTEMPTS = 30; // 최대 시도 횟수 (2초 간격으로 약 1분간 시도)

  const getUserData = async () => {
    try {
      const prepareResponse = await axios.post('http://localhost:4000/api/klip/prepare');
      const { requestKey, qrUrl } = prepareResponse.data;
      setQrvalueAuth(qrUrl);

      let attempts = 0; // 폴링 시도 횟수

      const timerId = setInterval(async () => {
        try {
          const resultResponse = await axios.get(`http://localhost:4000/api/klip/result/${requestKey}`);
          console.log('resultResponse :>> ', resultResponse);
          if (resultResponse.data.token) {
            const { token, address } = resultResponse.data;

            localStorage.setItem('jwtToken', token);
            
            setMyAddress(address);
            setIsLoggedIn(true); // 사용자가 로그인되었음을 표시
            clearInterval(timerId);
            setQrvalueAuth(DEFAULT_QR_CODE);
          } else {
            console.log('Waiting for user to complete QR code authentication...');
          }
        } catch (pollError) {
          console.error('Error during polling:', pollError);
        }

        attempts += 1;
        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(timerId);
          console.error('QR code authentication timed out.');
        }
      }, POLLING_INTERVAL);
    } catch (error) {
      console.error('Failed to prepare QR code', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // 로그아웃 시 토큰 제거
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
              </div>
            )}
          </>
        ) : (
          <div>
            <br />
            <p>환영합니다! 지갑 주소: {myAddress}</p>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default KlipLogin;
