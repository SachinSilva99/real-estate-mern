import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import userRouter from "./routes/User.route.js";
env.config();

const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

app.listen(3000, () => {
  console.log("Server running on port 3000!!");
});

app.get("/test", userRouter);
