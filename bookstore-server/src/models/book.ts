import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
  title: string;
  author: string;
  details: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: {
    type: String,
    required: true,
  },
  details: { type: String, required: true },
});

export default mongoose.model<Book>("Book", BookSchema);
