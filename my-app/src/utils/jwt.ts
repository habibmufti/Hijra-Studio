import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

const signToken = (payload: { _id: ObjectId; name: string; username: string; email: string }) => {
  return jwt.sign(payload, secret);
};
const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};

export { signToken, verifyToken };