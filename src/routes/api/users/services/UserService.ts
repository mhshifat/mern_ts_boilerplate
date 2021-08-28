import { FilterQuery } from "mongoose";
import User, { UserDocument, UserDocumentModel } from "../model/User";

const UserService = {
  findNullUser: async (query: FilterQuery<UserDocumentModel>) => {
    const doc = await User.findOne(query);
    if (doc) throw new Error("409:User already exists!");
    return doc;
  },
  findUser: async (query: FilterQuery<UserDocumentModel>) => {
    const doc = await User.findOne(query);
    if (!doc) throw new Error("404:User not found!");
    return doc;
  },
  createUser: async (body: UserDocument) => {
    return User.create(body);
  },
};

export default UserService;
