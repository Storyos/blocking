// klipService.js
const axios = require("axios");
const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "Blocking";

// QR 생성 링크 만드는 함수
const getKlipAccessUrl = (request_key) => {
  return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
};

// Klip API와 통신하는 함수
const prepareKlipRequest = async () => {
  const response = await axios.post(A2P_API_PREPARE_URL, {
    bapp: {
      name: APP_NAME,
    },
    callback: {
      success: "https://172.18.111.181:3000/settings", // 사용자가 돌아올 URL 설정
      fail: "https://172.18.111.181:3000/", // 실패 시 리다이렉트될 URL
    },
    type: "auth",
  });
  console.log(response.data);
  return response.data.request_key;
};

const getKlipResult = async (request_key) => {
  const response = await axios.get(
    `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
  );
  return response.data;
};

module.exports = { prepareKlipRequest, getKlipResult, getKlipAccessUrl };
