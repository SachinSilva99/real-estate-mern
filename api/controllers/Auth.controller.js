import User from "../models/User.model.js";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json("user created");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
