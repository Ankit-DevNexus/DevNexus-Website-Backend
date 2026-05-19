import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Routes from "./Routes/routes.js";
import cors from "cors";
import connectDB from "./config/connectWebsiteDB.js";

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;

const app = express();
connectDB(uri);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002", // ✅ your Next.js port
  "http://devnexussolutions.com",
  "https://devnexussolutions.com",
  "http://www.devnexussolutions.com",
  "https://www.devnexussolutions.com",
  "https://devnexus-private.vercel.app",
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
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", Routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`); 
});