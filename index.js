import dotenv from "dotenv";
dotenv.config();

import express from "express";

import Routes from "./Routes/routes.js";
import cors from "cors";
import connectDB from "./config/connectWebsiteDB.js";

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
connectDB(uri);

const allowedOrigins = [
  "http://devnexussolutions.com",
  "https://devnexussolutions.com",
  "http://www.devnexussolutions.com",
  "https://www.devnexussolutions.com",
  "https://meta-testing-3.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", Routes);

app.get("/", (req, res) => {
  res.status(200).json({
    sucess: true,
    messgae: "API is running",
  });
});

//mongodb connection
app.listen(PORT, () => {
  console.log(`Server is listening on http:localhost:${PORT}`);
});
