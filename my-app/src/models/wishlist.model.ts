import { Wishlistcollection } from "@/db/collection";
import { wishlistValidator } from "@/validate/wishlist.validator";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import z from "zod";

class Wishlist {
  static async addProductToWishlist(request: NextRequest) {
    const body = await request.json();
    try {
      const requestHeaders = new Headers(request.headers);
      const userId = requestHeaders.get("userId") || ""; // Provide a default value for userId
      const productId = body.productId;
      const isProductExist = await Wishlistcollection.findOne({ userId: new ObjectId(userId), productId: new ObjectId(productId) });
      if (isProductExist) {
        return Response.json({ message: "Product already exist in wishlist" }, { status: 400 });
      }
      const raw = {
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
      await Wishlistcollection.insertOne(raw);
      return Response.json({ message: "Product has been added to wishlist" }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json({ message: error.errors[0].message }, { status: 400 });
      } else {
        return Response.json(error, { status: 500 });
      }
    }
  }
  static async getWishlist(request: NextRequest) {
    try {
      const requestHeaders = new Headers(request.headers);
      const userId = requestHeaders.get("userId");
      const wishlist = await Wishlistcollection.aggregate([
        { $match: { userId: new ObjectId(userId || "") } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ]).toArray();
      return Response.json(wishlist, { status: 200 });
    } catch (error) {
      return Response.json(error, { status: 500 });
    }
  }
  static async removeProductFromWishlist(request: NextRequest) {
    const body = await request.json();
    try {
      const requestHeaders = new Headers(request.headers);
      const userId = requestHeaders.get("userId") || ""; // Provide a default value for userId
      const productId = body.productId;
      await Wishlistcollection.deleteOne({ userId: new ObjectId(userId), productId: new ObjectId(productId) });
      return Response.json({ message: "Product has been removed from wishlist" }, { status: 200 });
    } catch (error) {
      return Response.json(error, { status: 500 });
    }
  }
}
export default Wishlist;
