/* eslint-disable func-names */
import bcrypt from "bcryptjs";
import { Document, model, Schema } from "mongoose";
import m2s from "mongoose-to-swagger";

export interface AuthDocument {
  user_id: string;
  password: string;
  token?: string;
}

export interface AuthDocumentModel extends AuthDocument, Document {
  comparePassword: (candidatePassword: any) => Promise<boolean>;
}

const DocumentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    password: { type: String, default: "" },
    token: { type: String, default: "" }
  },
  { timestamps: true }
);

DocumentSchema.pre("save", async function (next) {
  const user: any = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 12);
  return next();
});

DocumentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatched = await bcrypt.compare(
    candidatePassword,
    (this as any).password
  );
  if (!isMatched) throw new Error("400:Invalid credentials!");
  return isMatched;
};

const Auth = model<AuthDocumentModel>("Auth", DocumentSchema, "auth");

export const AuthSwaggerSchema = m2s(Auth);

export default Auth;
