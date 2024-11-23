require('dotenv').config();
const express = require('express');
const router = express.Router();
const { mintSBT } = require('../services/ethers');

// SBT 발급 라우트
router.post("/mintSBT", async (req, res) => {
  const { recipientAddress, sbtType, name, studentId, ipfsUrl } = req.body;

  // 입력값 검증
  if (!recipientAddress || sbtType === undefined || !name || !studentId || !ipfsUrl) {
    return res.status(400).json({
      success: false,
      message: "모든 필드(recipientAddress, sbtType, name, studentId, ipfsUrl)가 필요합니다.",
    });
  }

  console.log("SBT 발급 요청 정보:");
  console.log("Recipient Address:", recipientAddress);
  console.log("SBT Type:", sbtType);
  console.log("Name:", name);
  console.log("Student ID:", studentId);
  console.log("IPFS URL:", ipfsUrl);

  try {
    // mintSBT 함수 호출
    const transactionHash = await mintSBT(recipientAddress, sbtType, name, studentId, ipfsUrl);
    res.status(200).json({
      success: true,
      transactionHash,
    });
  } catch (error) {
    console.error("SBT 발급 중 오류 발생:", error);
    res.status(500).json({
      success: false,
      message: "SBT 발급 실패",
      error: error.message,
    });
  }
});


module.exports = router;
