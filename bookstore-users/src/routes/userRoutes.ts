import { Router } from "express";
import { createUser, findUserById } from "../controllers/userController";

const router = Router();

router.post("/create", createUser);
router.get("/:user_id", findUserById);

export default router;
