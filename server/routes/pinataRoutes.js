const axios = require("axios");
const express = require("express");
const router = express.Router();
const { fetchDataFromPinata, UploadDataToPinata } = require("../services/pinata");
const { mintSBT } = require("../services/ethers");


// /datafromPinata 경로에서 데이터를 가져오는 엔드포인트 정의
router.get("/datafromPinata", async (req, res) => {
  const cid = req.query.cid; // CID를 쿼리 매개변수로 받음

  if (!cid) {
    return res.status(400).json({ error: "CID is required" });
  }

  try {
    // fetchDataFromPinata 함수 호출하여 데이터를 가져옴
    const data = await fetchDataFromPinata(cid);
    res.json(data); // 가져온 데이터를 JSON 형태로 응답
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Pinata" });
  }
});

// Pinata로 데이터를 업로드하는 엔드포인트
router.post("/uploadToPinata", async (req, res) => {
  const formData = req.body;
  try {
    const pinataResponse = await UploadDataToPinata(formData);
    res.status(200).json({ success: true, data: pinataResponse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading data to Pinata",
      error: error.message,
    });
  }
});

// SBT 발급 엔드포인트
router.post("/mintSBT", async (req, res) => {
  const { recipientAddress, sbtType, name, studentId, ipfsUrl } = req.body;

  // 입력값 검증
  if (!recipientAddress || !sbtType || !name || !studentId || !ipfsUrl) {
    return res.status(400).json({
      success: false,
      message: "All fields (recipientAddress, sbtType, name, studentId, ipfsUrl) are required",
    });
  }

  try {
    // SBT 발급 함수 호출
    const transactionHash = await mintSBT(recipientAddress, sbtType, name, studentId, ipfsUrl);

    // 성공 응답
    res.status(200).json({
      success: true,
      message: "SBT minted successfully",
      transactionHash: transactionHash,
    });
  } catch (error) {
    console.error("Error minting SBT:", error);
    res.status(500).json({
      success: false,
      message: "Error minting SBT",
      error: error.message,
    });
  }
});

module.exports = router;
