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

const UploadDataToPinata = async (formData) => {
  console.log("업로드 요청 들어옴");
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataSecretApiKey = process.env.PINATA_API_SECRET;
  const pinataUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  // 추가 정보 설정
  const additionalDetails = getAdditionalDetails(formData.status);

  const body = {
    pinataMetadata: {
      name: formData.name, // 이름
    },
    pinataContent: {
      studentId: formData.studentId, // 학번
      university: formData.university || "Pukyong University", // 기본값 설정
      status: formData.status, // 상태 (예: "재학증명서")
      description: additionalDetails.description, // 상태에 따른 설명
      issuedDate: new Date().toISOString().split("T")[0], // 발급일 추가
      extraDetails: additionalDetails.extraDetails, // 추가 세부정보
    },
  };

  try {
    const response = await axios.post(pinataUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    console.log('Pinata Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
};

// 상태에 따른 추가 정보 설정
const getAdditionalDetails = (status) => {
  switch (status) {
    case "재학증명서":
      return {
        description: "학생의 재학 상태를 증명하는 문서입니다.",
        extraDetails: {
          validityPeriod: "발급일로부터 6개월 유효",
          remarks: "부경대학교 공식 발급",
        },
      };
    case "졸업증명서":
      return {
        description: "학생의 졸업 상태를 증명하는 문서입니다.",
        extraDetails: {
          graduationYear: "2024년",
          remarks: "우수 졸업자로 선발",
        },
      };
    case "해커톤 수상내역":
      return {
        description: "부경대학교 학생이 참가한 해커톤 대회에서의 수상 내역입니다.",
        extraDetails: {
          competitionName: "부경대학교 창의적 해커톤",
          achievement: "최우수상",
          eventDate: "2024년 6월 10일",
        },
      };
    case "동아리 활동내역":
      return {
        description: "학생의 동아리 활동을 증명하는 내역입니다.",
        extraDetails: {
          clubName: "IT 창의 융합 동아리",
          role: "동아리 회장",
          activityDuration: "2021년 3월 ~ 2024년 2월",
        },
      };
    case "임원직/직책":
      return {
        description: "부경대학교 내에서의 학생 리더십 활동을 증명합니다.",
        extraDetails: {
          position: "학생회장",
          department: "컴퓨터공학과",
          term: "2023년 3월 ~ 2024년 2월",
        },
      };
    case "비교과 프로그램":
      return {
        description: "학생이 참가한 비교과 프로그램에 대한 정보입니다.",
        extraDetails: {
          programName: "산학 연계 멘토링 프로그램",
          duration: "2024년 3월 ~ 2024년 6월",
          remarks: "멘토링 우수 참여자",
        },
      };
    case "학생회 활동내역":
      return {
        description: "학생회에서 활동한 경력을 증명합니다.",
        extraDetails: {
          department: "컴퓨터공학과 학생회",
          activities: "학과 체육대회 및 교류 행사 주관",
          term: "2023년 3월 ~ 2024년 2월",
        },
      };
    default:
      return {
        description: "기타 상태에 대한 설명이 필요합니다.",
        extraDetails: {
          remarks: "상세 설명 없음",
        },
      };
  }
};


// CommonJS 방식으로 함수 내보내기
module.exports = { fetchDataFromPinata,UploadDataToPinata };
