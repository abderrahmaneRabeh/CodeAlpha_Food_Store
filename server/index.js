import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Congiguration

const app = express();

dotenv.config();
const PORT = process.env.PORT;

// MIDDLEWARE

app.use(express.json());
app.use(cors());

// ROUTES

app.get("/", (req, res) => {
  res.send("Hello World");
});

// DB CONNECTION

connectDB();

// API ENDPOINTS

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

// RUN SERVER

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
