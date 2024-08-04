// routes/klipRoutes.js
const express = require('express');
const router = express.Router();
const { prepareKlipRequest, getKlipResult, getKlipAccessUrl } = require('../services/klipService');
const jwt = require('jsonwebtoken');
const { error } = require('console');

// 추후 .env 로 관리
const JWT_SECRET = 'k2vyFeN72qnbmTvdnxXr';

// Klip API 준비 요청 엔드포인트
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

// Klip API 결과 요청 엔드포인트
router.get('/result/:requestKey', async (req, res) => {
    const { requestKey } = req.params;
    try {
        const result = await getKlipResult(requestKey);

        if(result.result){
            console.log(result);
            const klaytnAddress = result.result.klaytn_address;

            const token = jwt.sign({address:klaytnAddress}, JWT_SECRET, {expiresIn: '1h'});

            res.json({token, address:klaytnAddress});
        }else{
            res.status(404).json({error: "No result found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get Klip result' });
    }
});

module.exports = router;
