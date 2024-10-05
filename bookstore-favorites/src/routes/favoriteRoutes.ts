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

router.get("/:userId", verifyTokenMiddleware, getFavorites);
router.get("/:favoriteId", verifyTokenMiddleware, findFavoriteById);

router.post("/", verifyTokenMiddleware, createFavorite);
router.put("/update", verifyTokenMiddleware, updateFavorite);
router.delete("/:favoriteId", verifyTokenMiddleware, deleteFavorite);

export default router;
