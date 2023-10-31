import * as dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import mongoose from "mongoose";

import morgan from "morgan";

import express from "express";

import jobRouter from "./routes/jobRoutes.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

import ErrorHandler from "./middlewares/errorHandler.js";
import NotFoundError from "./middlewares/notFound.js";

import { authenticateUser } from "./middlewares/auth.js";

import helmet from"helmet"
import mongoSanitize from "express-mongo-sanitize";


import cookieParser from "cookie-parser";


import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";





const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));  

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());

// security packages
app.use(helmet());
app.use(mongoSanitize()); 

// routes
app.use("/api/v1/jobs",authenticateUser, jobRouter);
app.use("/api/v1/user", authenticateUser,userRouter);
app.use("/api/v1", authRouter);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// error handler`
app.use(NotFoundError);
app.use(ErrorHandler);


const Port = process.env.PORT || 5010;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
  });
} catch (error) {
console.log("error");
}
