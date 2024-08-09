import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import vaidatior from "validator";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

// CREATE TOKEN

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// GET ALL USERS

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// LOGIN USER

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(existingUser._id);

    res.status(200).json({
      success: true,
      token,
      user: existingUser,
    });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

// REGISTER USER

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(409)
        .json({ success: false, message: "Invalid email address" });
    }

    if (password.length < 8) {
      return res.status(409).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);

    res
      .status(201)
      .json({ success: true, message: "User created", token, data: newUser });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, getUsers };
