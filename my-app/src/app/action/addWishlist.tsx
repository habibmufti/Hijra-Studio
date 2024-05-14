"use client";
import React from "react";
import Swal from "sweetalert2";
import { ObjectId } from "mongodb";

function AddWishlist({ productId }: { productId: string }) {
  const addWishlist = async (productId: string) => {
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
    <button
      onClick={() => {
        addWishlist(productId);
      }}
      className="btn btn-secondary my-2 "
    >
      Add to Wishlist
    </button>
  );
}

export default AddWishlist;
