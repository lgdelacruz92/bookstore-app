import mongoose, { Schema, Document } from "mongoose";
import { Book } from "../types/book";

export interface BookDocument extends Book, Document {}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: {
    type: String,
    required: true,
  },
  details: { type: String, required: true },
  imgUrl: { type: String, required: false },
});

export default mongoose.model<BookDocument>("BookDocument", BookSchema);
