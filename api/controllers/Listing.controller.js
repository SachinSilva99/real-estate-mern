import Listing from "../models/Listing.model.js";
import { errorHandler } from "../utils/Error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Lising not found"));
  }
  console.log(req.params.id);
  console.log(listing.userRef);
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("listing has been deleted");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
