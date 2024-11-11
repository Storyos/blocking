const axios = require("axios");
const express = require("express");
const router = express.Router();
const { fetchDataFromPinata } = require("../services/pinata");

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
module.exports = router;
