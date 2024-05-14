"use client";
import toIDR from "@/helpers/toIDR";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdFavoriteBorder } from "react-icons/md";
import type { ProductArray } from "@/interface/product.interface";
import Searchbar from "@/components/searchbar";
import { ObjectId } from "mongodb";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "@/components/productCard";

function Product() {
  const [products, setProducts] = useState<ProductArray>([]);
  const [search, setSearch] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products?searchQuery=${search}&pageNumber=1`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const { page, totalData, totalPage, dataPerPage, data } = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    getData();
  }, []);
  async function fetchProduct() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products?searchQuery=${search}&pageNumber=${currentPage}`, {
      cache: "no-store",
    });
    const { data } = await res.json();
    return data;
  }

  const fetchData = async () => {
    const moreProduct: never[] = await fetchProduct();

    setProducts([...products, ...moreProduct]);

    if (moreProduct.length === 0 || moreProduct.length < 8) {
      setHasMore(false);
    }

    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-pink-50 pb-3 pt-20">
      <div className="container">
        <Searchbar fetchData={fetchData} setSearch={setSearch} />
        <InfiniteScroll
          dataLength={products.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <div className="text-center">
              <p>Loading...</p>
            </div>
          }
          endMessage={
            <p className="text-center">
              <b>That is all we got for now!</b>
            </p>
          }
        >
          <div className="grid grid-cols-4 gap-4 mb-3">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Product;
