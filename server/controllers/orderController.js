import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACING USER ORDER FOR FRONTEND
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = await orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      {
        cartData: {},
      }
    );

    const lien_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    lien_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lien_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// VERIFYING USER ORDER FOR FRONTEND

const verifyOrder = async (req, res) => {
  try {
    const { success, orderId } = req.body;

    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.status(200).json({ success: true, message: "Paiment reussi" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Paiment echoue" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// USER ORDERS FOR FRONTEND

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// ALL ORDERS FOR ADMIN PANEL

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// UPDATE ORDER STATUS FOR ADMIN PANEL

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export { placeOrder, verifyOrder, userOrders, allOrders, updateOrderStatus };
