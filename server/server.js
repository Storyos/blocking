const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const klipRouter = require('./routes/klip_login');
require('dotenv').config();

const app = express();
const port = 3001;
const cors = require('cors');
const { timeStamp } = require('console');
app.use(cors());

app.use(express.json());
app.use(express.static('public')); // 정적 파일 제공을 위한 설정
app.use(bodyParser.json());
app.use('/klip',klipRouter);

// 루트 경로에 대한 엔드포인트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data',(req,res)=>{
  const data = {
    message: 'Hello from BE',
    timeStamp: new Date(),
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
