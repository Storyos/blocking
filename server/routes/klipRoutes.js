// routes/klipRoutes.js
const axios = require("axios");
const express = require("express");
const router = express.Router();
const {
  prepareKlipRequest,
  getKlipResult,
  getKlipAccessUrl,
} = require("../services/klipService");
const jwt = require("jsonwebtoken");
const { error } = require("console");

// 추후 .env 로 관리
const JWT_SECRET = "k2vyFeN72qnbmTvdnxXr";

// Klip API 준비 요청 엔드포인트
router.post("/prepare", async (req, res) => {
  try {
    const requestKey = await prepareKlipRequest();
    const qrUrl = getKlipAccessUrl(requestKey);
    res.json({ requestKey, qrUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to prepare Klip request" });
  }
});

router.get("/prepareMobile", async (req, res) => {
  try {
    const requestKey = await prepareKlipRequest();
    const deeplink = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;
    console.log(deeplink);
    res.json({ deeplink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to prepare Klip request" });
  }
});

// 이메일 인증 엔드포인트
router.post("/verifyemail", async (req, res) => {
  const { email, univName } = req.body;
  console.log(req.body);
  if (!email || !univName) {
    return res
      .status(400)
      .json({ error: "Email and university name are required" });
  }

  try {
    // UnivCert API 호출
    const response = await axios.post("https://univcert.com/api/v1/certify", {
      key: "80718826-ee42-485f-a2ce-65b366bd1e74",
      email: email,
      univName: "국립부경대학교",
      univ_check: true,
    });
    console.log(response.data);
    // 인증 코드 전송 성공 시
    if (response.data.success) {
      res.json({
        message: "Verification email sent",
        requestKey: response.data.requestKey,
      });
    } else {
      res.status(400).json({ error: "대학교 이메일이 아닙니다." });
    }
  } catch (error) {
    console.error("UnivCert API error:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

// Klip API 결과 요청 엔드포인트
router.get("/result/:requestKey", async (req, res) => {
  const { requestKey } = req.params;
  try {
    const result = await getKlipResult(requestKey);

    if (result.result) {
      console.log(result);
      const klaytnAddress = result.result.klaytn_address;

      const token = jwt.sign({ address: klaytnAddress }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, address: klaytnAddress });
    } else {
      res.status(404).json({ error: "No result found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Klip result" });
  }
});

module.exports = router;
