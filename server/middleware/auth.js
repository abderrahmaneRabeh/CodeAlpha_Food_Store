import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleWare = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    next();
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export default authMiddleWare;
