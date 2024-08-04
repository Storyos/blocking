// server/server.js
const express = require('express');
const cors = require('cors');
const { prepareKlipRequest, getKlipResult, getKlipAccessUrl } = require('./services/klipService');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Klip API 준비 요청 엔드포인트
app.post('/api/klip/prepare', async (req, res) => {
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
app.get('/api/klip/result/:requestKey', async (req, res) => {
  const { requestKey } = req.params;
  try {
    const result = await getKlipResult(requestKey);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Klip result' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
