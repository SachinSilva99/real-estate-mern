import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import userRouter from "./routes/User.route.js";
import authRouter from "./routes/Auth.route.js";
import listingRoute from "./routes/Listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

const __dirname = path.resolve();
env.config();

const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

app.listen(3000, () => {
  console.log("Server running on port 3000!!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", listingRoute);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
