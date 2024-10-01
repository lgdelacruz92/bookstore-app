import { Router } from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  findBookById,
} from "../controllers/bookController";

const router = Router();

router.get("/", getAllBooks);
router.get("/:bookId", findBookById);

router.post("/", createBook);
router.put("/update", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
