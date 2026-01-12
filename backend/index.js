import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import reportRoutes from "./routes/report.route.js";

// Load env variables
dotenv.config();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// -------------------- DATABASE --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// -------------------- CORS CONFIG --------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONT_END_URL, // Vercel URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(null, false); // ❗ Do NOT throw error
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests


// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(cookieParser());

console.log("ENV CHECK:", {
  MONGO_URI: process.env.MONGO_URI,
  FRONT_END_URL: process.env.FRONT_END_URL,
  NODE_ENV: process.env.NODE_ENV,
});

// -------------------- ROUTES --------------------
// Mount routers with guarded logging to pinpoint mount-time errors
const mountRouter = (base, router, name) => {
  try {
    console.log(`Mounting ${name} at ${base} — type: ${typeof router}`);
    app.use(base, router);
  } catch (err) {
    console.error(`Failed to mount ${name} at ${base}:`, err);
    // Exit so nodemon will show the error and we can fix the offending router
    process.exit(1);
  }
};

mountRouter("/api/auth", authRoutes, "authRoutes");
mountRouter("/api/users", userRoutes, "userRoutes");
mountRouter("/api/tasks", taskRoutes, "taskRoutes");
mountRouter("/api/reports", reportRoutes, "reportRoutes");

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
