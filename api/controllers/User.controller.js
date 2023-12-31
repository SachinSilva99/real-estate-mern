import { errorHandler } from "../utils/Error.js";
import User from "../models/User.model.js";
import bycript from "bcrypt";
import Listing from "../models/Listing.model.js";

export const test = (req, res) => {
  res.send("hello");
};
export const updateUser = async (req, res, next) => {
  if (req.user.id === req.params.id)
    try {
      if (req.body.password) {
        req.body.password = bycript.hashSync(req.body.password, 10);
      }
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updateUser._doc;
      res.status(200).json(rest);
    } catch (err) {
      return next(errorHandler(401, "you can only update your own account"));
    }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const lisitngs = await Listing.find({ userRef: req.params.id });
      res.status(200).json(lisitngs);
    } catch (err) {
      next(err);
    }
  } else {
    return next(errorHandler(401, "You can view your own lisiting"));
  }
};
