import { ProductCollection } from "@/db/collection";
import { NextRequest } from "next/server";
class Product {
  static async getAllProduct(request: NextRequest) {
    const searchParms = request.nextUrl.searchParams;
    const search = searchParms.get("search");
    console.log("🚀 ~ Product ~ getAllProduct ~ search:", search)
    try {
      const product = await ProductCollection.aggregate([
        {
          $match: {
            name: {
              $regex: search,
              $options: "i",
            },
          },
        },
      ]).toArray();
      return Response.json(product, { status: 200 });
    } catch (error) {
      return Response.json(error, { status: 500 });
    }
  }
  static async getProductBySlug(slug: string) {
    try {
      const product = await ProductCollection.findOne({ slug: slug });
      return Response.json(product, { status: 200 });
    } catch (error) {
      return Response.json(error, { status: 500 });
    }
  }
}
export default Product;
