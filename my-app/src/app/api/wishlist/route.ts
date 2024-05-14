import Wishlist from "@/models/wishlist.model";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return await Wishlist.addProductToWishlist(request);
}
export async function GET(request: NextRequest) {
  return await Wishlist.getWishlist(request);
  
}
export async function DELETE(request: NextRequest) {
  return await Wishlist.removeProductFromWishlist(request);
}