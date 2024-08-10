import express from "express";
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "../controllers/cardController.js";

import authMiddleWare from "../middleware/auth.js";

const cartRouter = express.Router();

// ADD TO CART
cartRouter.post("/add", authMiddleWare, addToCart);
// REMOVE FROM CART
cartRouter.post("/remove", authMiddleWare, removeFromCart);
// GET USER CART
cartRouter.get("/list", authMiddleWare, getUserCart);

export default cartRouter;
