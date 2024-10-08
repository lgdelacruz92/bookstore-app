// src/index.ts
import express, { Request, Response } from "express";
import admin from "./firebaseAdmin";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Define the /verify-token endpoint
app.post("/verify-token", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

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
