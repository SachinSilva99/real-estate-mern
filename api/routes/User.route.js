import express from "express";
import { test, updateUser,deleteUser } from "../controllers/User.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();

router.get("/test", test);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
