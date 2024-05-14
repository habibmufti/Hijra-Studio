import Product from "@/models/product.model";

type Params = {
  slug: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const slug = context.params.slug;
  return await Product.getProductBySlug(slug);
}

