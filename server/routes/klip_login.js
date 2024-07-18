// routes/klip.js

const express = require('express');
const axios = require('axios');
const router = express.Router();
const path = require('path');

const API_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';
const RESULT_URL = 'https://a2a-api.klipwallet.com/v2/a2a/result';

// Klip 로그인 요청 생성
router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(API_URL, {
            bapp: {
                name: 'Blocking' // 애플리케이션 이름
            },
            type: 'auth' // 인증 요청
        });
        const requestKey = response.data.request_key;
        const qrUrl = `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;
        res.json({ requestKey, qrUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to prepare Klip login' });
    }
});

// Klip 로그인 결과 확인
router.get('/result/:requestKey', async (req, res) => {
    const { requestKey } = req.params;

    try {
        const response = await axios.get(`${RESULT_URL}?request_key=${requestKey}`);
        const result = response.data;

        if (result.status === 'completed') {
            const walletAddress = result.result.klaytn_address;
            res.json({ walletAddress });
        } else {
            res.status(400).json({ error: 'Login not completed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Klip login result' });
    }
});

module.exports = router;
