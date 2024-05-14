import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Navbar() {
  const isCookie = cookies().get("access_token");
  const handleLogout = async () => {
    "use server";
    cookies().delete("access_token");
    redirect("/");
  };

  return (
    <div className="rounded-b-xl">
      <nav className={`navbar bg-white shadow-xl rounded-b-xl px-6 fixed top-0 left-0 z-50 max-w-screen`}>
        <div className="navbar-start">
          <Link href="/" className="">
            <img className="mx-auto w-16" src="/img/hijra_studio.svg" alt="hijra studio logo" />
          </Link>
          <Link href="/product" className=" px-2">
            All Product
          </Link>
          <Link href="/wishlist" className=" px-2">
            Wishlist
          </Link>
        </div>
        <div className="navbar-end align-baseline">
          {!isCookie ? (
            <>
              <Link href="login" className=" px-2">
                Sign In
              </Link>
              <Link href="register" className=" px-2">
                Create Account
              </Link>
            </>
          ) : (
            <form action={handleLogout}>
              <button type="submit">Logout</button>
            </form>
          )}

          <div className="px-6">
            <GoSearch size={"20px"} />
          </div>
          <div className="flex flex-row">
            <HiOutlineShoppingBag size={"20px"} />
            <p>0</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
