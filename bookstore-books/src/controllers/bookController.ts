// controllers/bookController.ts
import { Request, Response } from "express";
import Book from "../models/book";

const scheme = process.env.SCHEME;
const domain = process.env.DOMAIN;
const port = process.env.PORT;
const API_URL = `${scheme}://${domain}:${port}`;
const defaultLimit = 10;

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    // Extract query parameters for pagination, search, and bookIds
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || defaultLimit;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;
    console.log(req.query.bookIds);
    const bookIds = req.query.bookIds
      ? JSON.parse(req.query.bookIds as string)
      : null;

    let filter = {};

    // If bookIds query parameter exists, filter by the provided array of book IDs
    if (bookIds && Array.isArray(bookIds) && bookIds.length > 0) {
      filter = { _id: { $in: bookIds } };
    }
    // If search query exists, build a regex filter for title, author, or details
    else if (search) {
      const regex = new RegExp(search, "i"); // 'i' for case-insensitive
      filter = {
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } },
          { details: { $regex: regex } },
        ],
      };
    }

    // Fetch books with pagination and optional search filter
    const books = await Book.find(filter).skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments(filter); // Count total filtered books

    // Respond with paginated and filtered book data
    res.json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to fetch books", message: `${error}` });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    if (!req.body.imgUrl) {
      req.body.imgUrl = `${API_URL}/images/book-cover-placeholder.jpg`;
    }
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Unable to create book", message: JSON.stringify(error) });
  }
};

export const findBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    res.json(book);
  } catch (err) {
    res
      .status(404)
      .json({ error: "Book not found", message: JSON.stringify(err) });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { bookId, props } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(bookId, props, { new: true });
    res.json(book);
  } catch (err) {
    res.status(400).json({
      error: `Book ${bookId} update failed`,
      message: JSON.stringify(err),
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(400).json({
      error: `Book ${bookId} failed to delete`,
      message: JSON.stringify(err),
    });
  }
};
