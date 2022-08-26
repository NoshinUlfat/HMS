import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hallsRoute from "./routes/halls.js";
import roomsRoute from "./routes/rooms.js";
import dinginRoute from "./routes/dining.js";
import fundRoute from "./routes/fundRequest.js";
import studentsRoute from "./routes/students.js";
import roomAllotmentsRoute from "./routes/roomAllotments.js";
import noticesRoute from "./routes/notices.js";
import provostRoute from "./routes/provosts.js";
import notificationRoute from "./routes/notifications.js";
import dueRoute from "./routes/dues.js";
import defaulterRoute from "./routes/defaulters.js";
import certificateRoute from "./routes/certificateRequests.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/halls", hallsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/students", studentsRoute);
app.use("/api/notices", noticesRoute);
app.use("/api/roomAllotments", roomAllotmentsRoute);
app.use("/api/provosts", provostRoute);
app.use("/api/dining", dinginRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/dues", dueRoute);
app.use("/api/defaulters", defaulterRoute);
app.use("/api/certificate", certificateRoute);
app.use("/api/fundRequest", fundRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
