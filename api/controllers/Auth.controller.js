import User from "../models/User.model.js";
import { errorHandler } from "../utils/Error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json("user created");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return;
    res.status(201).json("user created");
  } catch (err) {
    next(err);
  }
};
