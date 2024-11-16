require("dotenv").config();
const axios = require("axios");

// 환경변수로부터 API 키, 시크릿 또는 JWT를 불러옵니다.
const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;

// Pinata에서 데이터를 가져오는 함수
const fetchDataFromPinata = async (cid) => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`, // JWT 사용 시
        pinata_api_key: PINATA_API_KEY, // API Key와 Secret을 사용하는 경우
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    // 데이터 출력
    console.log("Fetched data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Pinata:", error);
    throw new Error("Failed to fetch data from Pinata");
  }
};

// CommonJS 방식으로 함수 내보내기
module.exports = { fetchDataFromPinata };
