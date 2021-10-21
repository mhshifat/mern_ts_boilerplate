import { Document, model, Schema } from "mongoose";
import m2s from "mongoose-to-swagger";

export interface UserDocument {
  email: string;
  createdAt: string;
}

export interface UserDocumentModel extends UserDocument, Document {}

const DocumentSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false }
  },
  { timestamps: true }
);

const User = model<UserDocumentModel>("User", DocumentSchema, "users");

export const UserSwaggerSchema = m2s(User);

export default User;
