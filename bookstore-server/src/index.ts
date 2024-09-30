// src/index.ts

import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";
import cors from "cors";
dotenv.config();

const app = express();
const port = 4000;

const allowedOrigin = `${process.env.ALLOWED_ORIGIN}`;
// console.log(allowedOrigin);
app.use(
  cors({
    origin: allowedOrigin,
  })
);

const dbURI = `mongodb+srv://Cluster30875:${process.env.MONGOOSE_PASSWORD}@cluster30875.fp5ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster30875`;
// Connect to MongoDB
mongoose
  .connect(dbURI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
