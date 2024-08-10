import userModel from "../models/UserModel.js";

// ADD TO CART

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findOneAndUpdate({ _id: req.body.userId }, { cartData });

    res.status(201).json({ success: true, message: "Cart Added !!" });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

// REMOVE FROM CART

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findOneAndUpdate({ _id: req.body.userId }, { cartData });

    res.status(201).json({ success: true, message: "Cart Removed !!" });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

// GET USER CART DATA

const getUserCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    let cartData = userData.cartData;

    res.status(201).json({ success: true, cartData });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export { addToCart, removeFromCart, getUserCart };
