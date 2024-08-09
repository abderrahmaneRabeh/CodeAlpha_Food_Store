import express from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/list", getUsers);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
