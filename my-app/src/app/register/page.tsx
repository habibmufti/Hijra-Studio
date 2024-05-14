"use client";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name,
      username,
      email,
      password,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (response.ok) {
      const { message } = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
      }).then(() => {
        router.push("/login");
      });
    } else {
      const { message } = await response.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  }

  return (
    <>
      <div className="flex ">
        <div className="w-1/2 h-screen bg-register bg-center bg-cover flex flex-col-reverse ">
          <footer className="bg-gradient-to-t from-black to-transparent h-1/3 flex flex-col-reverse">
            <div className="text-xl text-center text-white [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black font-light m-8">
              <h1 className="">Experience the elegance and comfort of the Al-Sawad color of Mecca Medina scarf that accompanies every step of your journey gracefully 😇</h1>
            </div>
          </footer>
        </div>

        <div className="flex min-h-full flex-1 mt-9 flex-col justify-center lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto w-36" src="img/hijra_studio.svg" alt="hijra studio logo" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-black bg-pink-200 rounded-xl px-8 pt-8">
            <form className="space-y-6" action="#" method="POST" onSubmit={(e) => handleRegister(e)}>
              <div className="flex flex-row ">
                <div className="mr-1">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="gap-2">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="gap-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button className="btn bg-pink-300 text-grey-300 font-semibold rounded-xl w-fit hover:bg-pink-400 hover:text-white" type="submit">
                  Register
                </button>
              </div>
            </form>

            <p className="m-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
