import { Router } from "express";
import { createUser, findUserById } from "../controllers/userController";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const router = Router();

router.post("/create", verifyTokenMiddleware, createUser);
router.get("/:user_id", findUserById);

export default router;
