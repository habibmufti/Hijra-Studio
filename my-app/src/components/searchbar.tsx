"use client";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Searchbar({ fetchData, setSearch }: { fetchData: () => Promise<void>; setSearch: (search: string) => void }) {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <main className="py-10">
      <div className="container mx-auto">
        <form className="rounded-lg bg-transparent p-10" onSubmit={handleSearch}>
          <div className="mb-4 flex items-center">
            <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" className="w-full rounded-xl border border-gray-400 p-2" placeholder="Search ..." />
            <button type="submit">
              <IoSearchOutline className="mx-2" size={"30px"} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Searchbar;
