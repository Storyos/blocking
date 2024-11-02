const express = require('express');
const router = express.Router();
const { prepareKlipRequest, getKlipResult, getKlipAccessUrl } = require('../services/klipService');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // dotenv 설정

const JWT_SECRET = process.env.JWT_SECRET;  // 환경 변수에서 JWT_SECRET 가져오기

/**
 * @swagger
 * /api/klip/prepare:
 *   post:
 *     summary: Prepare Klip request
 *     description: Initiates a Klip request and returns the request key and QR code URL.
 *     responses:
 *       200:
 *         description: Klip request prepared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestKey:
 *                   type: string
 *                 qrUrl:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post('/prepare', async (req, res) => {
    try {
        const requestKey = await prepareKlipRequest();
        const qrUrl = getKlipAccessUrl(requestKey);
        res.json({ requestKey, qrUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to prepare Klip request' });
    }
});

/**
 * @swagger
 * /api/klip/prepareMobile:
 *   get:
 *     summary: Prepare Klip request for mobile
 *     description: Generates a deep link to open Klip wallet in KakaoTalk for mobile.
 *     responses:
 *       200:
 *         description: Klip request prepared successfully for mobile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deeplink:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get('/prepareMobile', async (req, res) => {
    try {
        const requestKey = await prepareKlipRequest();
        const deeplink = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;
        res.json({ deeplink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to prepare Klip request' });
    }
});

/**
 * @swagger
 * /api/klip/result/{requestKey}:
 *   get:
 *     summary: Get Klip request result
 *     description: Retrieves the result of the Klip request using the request key.
 *     parameters:
 *       - in: path
 *         name: requestKey
 *         required: true
 *         schema:
 *           type: string
 *         description: The request key for the Klip request
 *     responses:
 *       200:
 *         description: Klip request result retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 address:
 *                   type: string
 *       404:
 *         description: No result found
 *       500:
 *         description: Internal server error
 */
router.get('/result/:requestKey', async (req, res) => {
    const { requestKey } = req.params;
    try {
        const result = await getKlipResult(requestKey);

        if (result.result) {
            console.log(result);
            const klaytnAddress = result.result.klaytn_address;
            const token = jwt.sign({ address: klaytnAddress }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, address: klaytnAddress });
        } else {
            res.status(404).json({ error: "No result found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Klip result' });
    }
});

module.exports = router;
