import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HomeCarousel from "@/components/homeCarousel";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeCarousel />
      <div className="flex p-12">
        <div className="w-1/2 bg-hero2 bg-cover bg-center">
          <div className="flex w-full h-full bg-gray-800 bg-opacity-60 items-center justify-center">
            <h1 className="text-3xl text-white text-center">Capturing the Beauty of the World through our collections.</h1>
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-svh bg-neutral p-10 justify-center">
          <h1 className="text-9xl lg:text-8xl md:text-7xl sm:text-6xl text-neutral-content mb-6">BROWSE OUR FAVORITE PRODUCT</h1>
          <Link href="/product" className="btn btn-info w-fit">SHOP</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
