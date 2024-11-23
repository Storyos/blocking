require("dotenv").config();
const express = require("express");
const router = express.Router();
const { mintSBT, getSBTDataFromEvents,deleteSBT } = require("../services/ethers"); // getSBTData 추가

// SBT 발급 라우트
router.post("/mintSBT", async (req, res) => {
  const { recipientAddress, sbtType, name, studentId, ipfsUrl } = req.body;

  if (!recipientAddress || sbtType === undefined || !name || !studentId || !ipfsUrl) {
    return res.status(400).json({
      success: false,
      message: "모든 필드(recipientAddress, sbtType, name, studentId, ipfsUrl)가 필요합니다.",
    });
  }

  try {
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

// SBT 조회 라우트
router.get("/getSBTData", async (req, res) => {
  const userAddress = req.query.userAddress;

  if (!userAddress) {
    return res.status(400).json({
      success: false,
      message: "userAddress가 필요합니다.",
    });
  }

  try {
    const sbtDetails = await getSBTDataFromEvents(userAddress);
    res.status(200).json({
      success: true,
      sbtDetails,
    });
  } catch (error) {
    console.error("Error fetching SBT data from events:", error);
    res.status(500).json({
      success: false,
      message: "SBT 조회 실패",
      error: error.message,
    });
  }
});
router.post("/deleteSBT", async (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    return res.status(400).json({
      success: false,
      message: "tokenId가 필요합니다.",
    });
  }

  try {
    const transactionHash = await deleteSBT(tokenId);
    res.status(200).json({
      success: true,
      message: "SBT 삭제 성공",
      transactionHash,
    });
  } catch (error) {
    console.error("SBT 삭제 중 오류 발생:", error);
    res.status(500).json({
      success: false,
      message: "SBT 삭제 실패",
      error: error.message,
    });
  }
});

module.exports = router;
