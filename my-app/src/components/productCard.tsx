import { TypeProduct } from "@/validate/product.validator";
import toIDR from "@/helpers/toIDR";
import Link from "next/link";
import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import Swal from "sweetalert2";
import { ObjectId } from "mongodb";

function ProductCard(product: TypeProduct, i: number) {
  const addWishlist = async (productId: string | ObjectId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
      cache: "no-store",
    });
    if (response.ok) {
      const { message } = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
      });
    } else {
      const { message } = await response.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };
  return (
    <div key={i} className="card w-[300px] bg-base-100 shadow-xl hover:shadow-2xl hover:scale-110 hover:rounded-xl delay-500 hover:z-20">
      <Link href={`/product/${product.slug}`} className="tooltip" data-tip="click to see the details">
        <div className="relative">
          <img src={product.thumbnail} alt={product.name} className="aspect-square w-full object-cover rounded-xl" />
          <div className="absolute w-full py-3 bottom-0 inset-x-0 bg-gray-800 bg-opacity-60 text-white text-xs text-center leading-4 hover:translate-y-1 delay-500">
            {product.tags.map((tag, i) => (
              <div key={i} className="badge badge-outline mx-1">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {i < 6 && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{product.excerpt}</p>
        <div className="flex flex-row justify-between">
          <div>
            <p className="font-semibold text-xl">{toIDR(product.price)}</p>
          </div>
          <div className="flex items-center justify-center tooltip" data-tip="add to wishlist">
            <button onClick={() => addWishlist(product._id)}>
              <MdFavoriteBorder size={"30px"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
