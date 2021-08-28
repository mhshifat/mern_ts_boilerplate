import { Document, model, Schema } from "mongoose";

export interface UserDocument {
  email: string;
  createdAt: string;
}

export interface UserDocumentModel extends UserDocument, Document {}

const DocumentSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<UserDocumentModel>("User", DocumentSchema, "users");
