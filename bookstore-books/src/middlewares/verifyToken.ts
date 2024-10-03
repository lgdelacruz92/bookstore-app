import axios from "axios";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verifyTokenMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(404).json({ message: "Missing auth token" });
    return;
  }
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.AUTH_API_URL}/verify-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Attach the decoded user info to the request object
    req.user = response.data.user;
    next(); // Call next to pass control to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export { verifyTokenMiddleware };
