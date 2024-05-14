//

import z from "zod";
import { ObjectId } from "mongodb";
export const wishlistValidator = z.object({
  userId: z.string({ message: "UserId is required" }).min(1, { message: "UserId must be at least 1 character long" }),
  productId: z.string({ message: "ProductId is required" }).min(1, { message: "ProductId must be at least 1 character long" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TypeWishlist = {
  userId: string | ObjectId;
  productId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
