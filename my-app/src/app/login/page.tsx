import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  async function handleLogin(formData: FormData) {
    "use server";

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (response.ok) {
      const { access_token } = await response.json();
      cookies().set("access_token", access_token);
      redirect("/");
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
        <div className="w-1/2 h-screen bg-login bg-center bg-cover flex flex-col-reverse ">
          <footer className="bg-gradient-to-t from-black to-transparent h-1/3 flex flex-col-reverse">
            <div className="text-xl text-center text-white [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black font-light m-8">
              <h1 className="">“Introducing our new One Set collection, featuring simple and comfortable at the same time. Step into comfort, embrace simplicity 🍂 ”</h1>
            </div>
          </footer>
        </div>
        <div className="flex min-h-full flex-1 mt-9 flex-col justify-center lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto w-44" src="img/hijra_studio.svg" alt="hijra studio logo" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-pink-200 rounded-xl px-8 pt-8">
            <form className="space-y-6" action={handleLogin} method="POST">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button className="btn bg-pink-300 text-grey-300 font-semibold rounded-xl hover:bg-pink-400 hover:text-white" type="submit">
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
