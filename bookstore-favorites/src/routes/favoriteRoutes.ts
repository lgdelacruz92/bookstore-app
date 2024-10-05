import { Router } from "express";
import {
  getFavorites,
  findFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../controllers/favoritesController";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const router = Router();

router.get("/", verifyTokenMiddleware, getFavorites);
router.get("/:bookId", verifyTokenMiddleware, findFavoriteById);

router.post("/", verifyTokenMiddleware, createFavorite);
router.put("/update", verifyTokenMiddleware, updateFavorite);
router.delete("/:bookId", verifyTokenMiddleware, deleteFavorite);

export default router;
