import { Router } from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  findBookById,
} from "../controllers/bookController";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const router = Router();

router.get("/", verifyTokenMiddleware, getAllBooks);
router.get("/:bookId", verifyTokenMiddleware, findBookById);

router.post("/", verifyTokenMiddleware, createBook);
router.put("/update", verifyTokenMiddleware, updateBook);
router.delete("/:bookId", verifyTokenMiddleware, deleteBook);

export default router;
