import express from "express";
import cors from "cors";
import chatRouter from "./src/chatRouter.js";
import init from "./src/init.js";

init();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.send("Server is up and running");
});
app.use("/api", chatRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
