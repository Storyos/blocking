const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

const KLIP_API_URL = 'https://a2a-api.klipwallet.com/v2';
const APP_NAME = 'YourAppName'; // 실제 앱 이름으로 변경
const REDIRECT_URI = 'http://localhost:3000/callback'; // 실제 리디렉트 URI로 변경
const KLIP_API_KEY = process.env.KLIP_API_KEY; // .env 파일에 저장된 API 키

app.use(express.json());
app.use(express.static('public')); // 정적 파일 제공을 위한 설정

// 루트 경로에 대한 엔드포인트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Klip 로그인 요청 엔드포인트
app.get('/login', async (req, res) => {
  try {
    const response = await axios.post(
      `${KLIP_API_URL}/a2a/prepare`,
      {
        bapp: {
          name: APP_NAME,
        },
        type: 'auth',
        callback: { redirect: REDIRECT_URI }, // 리디렉트 URL 설정
      },
      {
        headers: {
          Authorization: `Bearer ${KLIP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const requestKey = response.data.request_key;
    const qrUrl = `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;

    res.json({ qrUrl, requestKey });
  } catch (error) {
    console.error(
      'Error during Klip login request:',
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response ? error.response.data : 'Internal Server Error');
  }
});

// Klip 로그인 콜백 엔드포인트
app.get('/callback', async (req, res) => {
  const requestKey = req.query.request_key;

  try {
    const response = await axios.get(`${KLIP_API_URL}/a2a/result`, {
      params: { request_key: requestKey },
    });

    const result = response.data.result;

    if (result.status === 'completed') {
      // 로그인 성공, 사용자 정보 처리
      const userInfo = result.klip_address;
      res.json({ userInfo });
    } else {
      // 로그인 실패
      res.status(400).send('Login Failed');
    }
  } catch (error) {
    console.error(
      'Error during Klip login callback:',
      error.response ? error.response.data : error.message
    );
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
