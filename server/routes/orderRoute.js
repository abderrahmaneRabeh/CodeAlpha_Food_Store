import express from "express";
import auth from "../middleware/auth.js";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  allOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);

orderRouter.post("/verify", verifyOrder);

orderRouter.get("/userOrder", auth, userOrders);

orderRouter.get("/allOrders", allOrders);

orderRouter.post("/updateOrderStatus", updateOrderStatus);

export default orderRouter;
