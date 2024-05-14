import Link from "next/link";
import toIDR from "@/helpers/toIDR";
import type { Metadata, ResolvingMetadata } from "next";
import { Product } from "@/interface/product.interface";
import AddWishlist from "@/app/action/addWishlist";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await response.json()) as Product;
  // console.log("🚀 ~ generateMetadata ~ data:", data)
  return {
    title: data.name,
    description: data.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await response.json()) as Product;
  return (
    <div className="bg-pink-50 pt-20">
      <div className="flex p-12 ">
        <div className="w-1/2 bg-slate-200">
          <div className="max-w-screen h-full flex justify-center items-center">
            <div>
              <div className="carousel max-w-screen">
                {data.images.map((image, i) => (
                  <div key={i} id={`item${i + 1}`} className="carousel-item w-full items-center justify-center rounded-lg">
                    <img src={image} className="max-w-lg aspect-square object-contain" alt={`Image ${i + 1}`} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center w-full py-2 gap-2">
                {data.images.map((image, i) => (
                  <Link href={`#item${i + 1}`} id="key" className="boder-black" key={i}>
                    <img src={image} alt="image product" className="max-w-[50px]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around  w-1/2 h-svh p-10 bg-slate-50">
          <div>
            <h2 className="text-4xl w-full py-2 border-b-[1px] border-slate-300">{data.name}</h2>
            <p className="text-pretty">{data.description}</p>
          </div>
          <div>
            <div className="flex justify-between w-full py-2 border-b-[1px] border-slate-300">
              <div>
                <h2 className="text-l ">Price</h2>
              </div>
              <div>
                <h2 className="text-l ">{toIDR(data.price)}</h2>
              </div>
            </div>
            <div className="flex justify-between w-full py-2 border-b-[1px] border-slate-300">
              <div>
                <h2 className="text-l ">Tags</h2>
              </div>
              <div>
                {data.tags.map((tag, i) => (
                  <div key={i} className="badge badge-outline mx-1">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <AddWishlist productId={data._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
