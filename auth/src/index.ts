// src/index.ts
import express, { Request, Response } from "express";
import admin from "./firebaseAdmin";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

// Define the /verify-token endpoint
app.get("/verify-token", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token ?? "");
    res.json({ token: decodedToken });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
