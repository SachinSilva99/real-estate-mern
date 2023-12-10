import express from "express";
import mongoose from "mongoose";
import env from "dotenv";

env.config();

const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000!!");
});
