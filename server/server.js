const express = require('express');
const cors = require('cors');
const klipRoutes = require('./routes/klipRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js'); // Swagger 설정 파일 불러오기
const sbtRoute = require('./routes/sbtRoute');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Klip 라우트를 /api/klip 경로에 매핑
app.use('/api/klip', klipRoutes);
app.use("/issue-sbt", sbtRoute);
// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
