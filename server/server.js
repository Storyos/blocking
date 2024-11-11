// server/server.js
const express = require("express");
const cors = require("cors");
const klipRoutes = require("./routes/klipRoutes");
const pinataRoutes = require("./routes/pinataRoutes");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Klip 라우트를 /api/klip 경로에 매핑
app.use("/api/klip", klipRoutes);
app.use("/api/sbt", pinataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
