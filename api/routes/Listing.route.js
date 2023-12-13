import express from "express";
import { createListing } from "../controllers/Listing.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();
router.post('',verifyToken, createListing);
export default router;
