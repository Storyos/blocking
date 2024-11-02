// server/server.js
const express = require('express');
const cors = require('cors');
const { Formidable } = require('formidable'); // Formidable 클래스를 사용하도록 수정
const klipRoutes = require('./routes/klipRoutes');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Klip 라우트를 /api/klip 경로에 매핑
app.use('/api/klip', klipRoutes);

// 파일 업로드 라우트 추가 (사진 파일 제외)
app.post('/api/upload', (req, res) => {
  const form = new Formidable({ // Formidable 인스턴스를 생성
    multiples: false,
    uploadDir: __dirname + '/uploads', // 파일 임시 저장 경로 설정
    keepExtensions: true, // 확장자 유지
  });

  // FormData 파싱 및 처리
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: '파일 파싱 오류' });
    }

    // 'photo' 필드 제외, 나머지 데이터만 처리
    if (files.photo) {
      fs.unlink(files.photo.filepath, (unlinkErr) => {
        if (unlinkErr) console.error('임시 파일 삭제 오류:', unlinkErr);
      });
    }

    // 파일을 제외한 필드 데이터만 확인
    console.log('Received fields:', fields);

    // 데이터가 성공적으로 수신되었음을 응답
    res.json({ message: '파일을 제외한 데이터 수신 성공', data: fields });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
