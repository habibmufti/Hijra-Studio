import z from "zod";

export const productValidator = z.object({
  _id: z.string({ message: "Id is required" }).min(1, { message: "Id must be at least 1 character long" }),
  name: z.string({ message: "Name is required" }).min(1, { message: "Name must be at least 1 character long" }),
  slug: z.string({ message: "Slug is required" }).min(1, { message: "Slug must be at least 1 character long" }),
  description: z.string({ message: "Description is required" }).min(1, { message: "Description must be at least 1 character long" }),
  excerpt: z.string({ message: "Excerpt is required" }).min(1, { message: "Excerpt must be at least 1 character long" }),
  price: z.number({ message: "Price is required" }).min(1, { message: "Price must be at least 1 character long" }),
  tags: z.array(z.string({ message: "Tags is required" }).min(1, { message: "Tags must be at least 1 character long" })),
  thumbnail: z.string({ message: "Thumbnail is required" }).min(1, { message: "Thumbnail must be at least 1 character long" }),
  images: z.array(z.string({ message: "Images is required" }).min(1, { message: "Images must be at least 1 character long" })),
  createdAt: z.string({ message: "CreatedAt is required" }).min(1, { message: "CreatedAt must be at least 1 character long" }),
  updatedAt: z.string({ message: "UpdatedAt is required" }).min(1, { message: "UpdatedAt must be at least 1 character long" }),
});
export type TypeProduct = z.infer<typeof productValidator>;
