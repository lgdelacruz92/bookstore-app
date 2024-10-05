import mongoose, { Schema, Document } from "mongoose";
import { Favorite } from "../types/favorite";

export interface FavoriteDocument extends Favorite, Document {}

const FavoriteSchema: Schema = new Schema({
  book_id: { type: String, required: true },
  user_id: { type: String, required: true },
});

export default mongoose.model<FavoriteDocument>(
  "FavoriteDocument",
  FavoriteSchema
);
