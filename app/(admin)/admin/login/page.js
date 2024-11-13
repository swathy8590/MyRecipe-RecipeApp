
"use client"
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data, status } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {

      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);


    }

    if (data?.user.role === "user") {
      setError("Wrong Email")

    }



    if (res?.ok && data?.user.role === "admin") {
      alert("Login successful!");
      return router.push("/dashboard");
    }
    else {
      return router.push("/admin/login");

    }
  };


  useEffect(() => {

    status === "authenticated" && data.user.role === "admin" && router.push("/dashboard");

  }, [status, data])

  if (status === "loading") {
    return <div>Loading</div>
  }




  if (status === "unauthenticated" || data?.user?.role !== "admin") {

    return (
      <>
        <div className="bg-gray-200 w-full h-screen flex items-center">
          <div className="w-[60%] mx-auto  p-5 bg-white text-left border-solid border-gray-100 rounded-xl h-[70%] drop-shadow-lg  flex gap-5">
            <div className="w-[45%] h-full bg-green-100">

              <img src={`/asset/adminlogin.jpg`} className='w-[100%] h-[100%]' />
            </div>
            <div className="flex flex-col ps-10 pt-16 w-[55%]">
              <h1 className=" text-2xl font-semibold mb-8 text-gray-800">ADMIN LOGIN</h1>
              <form onSubmit={handleSubmit} method="post">
                <div className="pb-8 ">
                  <input
                    required
                    name="email"
                    placeholder="email"
                    className="border-solid border-green-300 border-[1px] w-[75%] h-[44px] rounded-lg ps-4"
                  />
                </div>
                <div className="pb-8">
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border-solid border-green-300 border-[1px] w-[75%] h-[44px] rounded-lg px-4"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="border-solid border-gray-300 border-[1px] w-[75%] h-[44px] rounded-lg bg-green-600 text-white"
                  >Login</button>
                </div>
              </form>
              <div className="ps-28 pt-3 ">
                {error}

              </div>

            </div>



          </div>


        </div>


      </>
    );
  }
}
