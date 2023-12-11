import User from "../models/User.model.js";
import { errorHandler } from "../utils/Error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

const saltRounds = 10;
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
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
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(404, "wrong credentials"));
    console.log(validPassword);
    console.log("here");
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
