const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
