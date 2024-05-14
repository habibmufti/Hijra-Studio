"use client";
import { TypeProduct } from "@/validate/product.validator";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Wishlist() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  // console.log("🚀 ~ Wishlist ~ wishlist:", wishlist);
  const getWishlist = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    setWishlist(data);
  };
  useEffect(() => {
    getWishlist();
  }, []);
  const removeWishlist = async (productId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/wishlist`, {
      method: "DELETE",
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
      }).then(() => {
        getWishlist();
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
    <div className="container mt-20 h-screen">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-xl text-center">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {wishlist.map((item: { _id: string; product: TypeProduct }) => (
              <tr key={item._id}>
                <td>
                  <img src={item.product.thumbnail} alt={item.product.name} className="w-32 h-32 object-cover rounded-md" />
                </td>
                <td>
                  <h1 className="text-lg font-semibold">{item.product.name}</h1>
                </td>
                <td>
                  <p className="text-gray-500">{item.product.excerpt}</p>
                </td>
                <td>
                  <p className="text-gray-500">Price: {item.product.price}</p>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => removeWishlist(item.product._id)}>
                    remove from wishlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Wishlist;
