// controllers/bookController.ts
import { Request, Response } from "express";
import Book from "../models/book";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch books" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Unable to create book", message: JSON.stringify(error) });
  }
};

export const queryBook = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ ...req.query });
    res.json(books);
  } catch (err) {
    res
      .status(404)
      .json({ error: "Book not found", message: JSON.stringify(err) });
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
