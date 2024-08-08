import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

// RUN SERVER

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
