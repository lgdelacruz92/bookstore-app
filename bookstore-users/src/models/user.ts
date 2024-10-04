import mongoose, { Schema, Document } from "mongoose";
import { User } from "../types/user";

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  uid: { type: String, required: false },
  email: { type: String, required: false },
  name: { type: String, required: false },
});

export default mongoose.model<UserDocument>("UserDocument", UserSchema);
