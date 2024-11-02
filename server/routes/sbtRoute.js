const express = require("express");
const router = express.Router();
const klipService = require("../services/klipService");
const filebaseService = require("../services/filebaseService");
const sbtService = require("../services/sbtService");

/**
 * @swagger
 * /issue-sbt:
 *   post:
 *     summary: Issue an SBT to a user
 *     description: Issues an SBT after authenticating the user via Klip and uploading metadata to Filebase.
 *     tags:
 *       - SBT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               description:
 *                 type: string
 *                 example: "Participation in Event XYZ"
 *     responses:
 *       200:
 *         description: SBT successfully issued to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 klipAccessUrl:
 *                   type: string
 *                   example: "https://klipwallet.com/?target=/a2a?request_key=abc123"
 *       500:
 *         description: Failed to issue SBT.
 */
router.post("/", async (req, res) => {
  try {
    // 1. Klip 요청을 준비합니다.
    const request_key = await klipService.prepareKlipRequest();

    // 2. 사용자에게 QR 코드 스캔 혹은 링크 클릭 요청을 진행합니다.
    const klipAccessUrl = klipService.getKlipAccessUrl(request_key);
    console.log("Klip Wallet Access URL:", klipAccessUrl);
    res.status(200).send({ klipAccessUrl });

    // 3. 사용자가 인증을 완료한 후, 결과를 기다립니다.
    let klipResult;
    while (true) {
      klipResult = await klipService.getKlipResult(request_key);
      if (klipResult.status === "completed") break;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기
    }

    const userAddress = klipResult.result.klaytn_address;

    // 4. Filebase에 데이터를 업로드하여 URL을 얻습니다.
    const inputData = req.body; // 사용자가 입력한 데이터
    const fileUrl = await filebaseService.uploadToFilebase(inputData);

    // 5. SBT 발급을 위한 메타데이터를 구성하고 발급을 진행합니다.
    const metadata = {
      ...inputData,
      fileUrl,
      userAddress,
    };
    await sbtService.issueSbt(metadata);

    res.status(200).send("SBT successfully issued to user: " + userAddress);
  } catch (error) {
    console.error("Error issuing SBT:", error);
    res.status(500).send("Failed to issue SBT");
  }
});

module.exports = router;
