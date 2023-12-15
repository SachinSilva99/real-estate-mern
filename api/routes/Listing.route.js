import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
} from "../controllers/Listing.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();
router.post("", verifyToken, createListing);
router.delete("/:id", verifyToken, deleteListing);
router.get("/:id", verifyToken, getListing);
router.get("", getListings);
router.put("/:id", verifyToken, updateListing);
export default router;
