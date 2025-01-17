
"use client"
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ClimbingBoxLoader, RingLoader } from "react-spinners";


export default function Loginpage({ setLogin }) {

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
        if (res?.ok) {
            return router.push("/home");
        }

    };



    useEffect(() => {

        status === "authenticated" && router.push("/home");

    }, [status, data])

    if (status === "loading") {
        return <div className='flex justify-center'><ClimbingBoxLoader

            color="#ff0202"
            cssOverride={{}}
            loading
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"

        /></div>
    }

    if (status === "unauthenticated"
        || data === null
    ) {

        return (
            <>

                <div className=" bg-black bg-opacity-50 z-50 w-full top-[-60px] h-screen flex items-center fixed my-[60px] ">


                    <div className="w-[70%] mx-auto  p-5 bg-white text-left border-solid border-gray-100 rounded-xl h-[70%] drop-shadow-lg  flex gap-5">
                        <button className="absolute right-10 text-black " onClick={() => setLogin(false)}><XMarkIcon className="size-6 " /></button>
                        <div className="w-[50%] h-full  ">
                            <img src={`/asset/loginimage.jpg`} className='w-[100%] h-[100%]' />
                            <div className="bg-red-500 z-40 w-[100%] h-[100%]  relative bottom-[100%] bg-opacity-40"></div>

                        </div>

                        <div className="flex flex-col ps-10 pt-16 w-[50%]">

                            <h1 className=" text-2xl font-semibold mb-8 text-gray-800"> LOGIN</h1>
                            <form method="post" onSubmit={handleSubmit}
                            >
                                <div className="pb-8 ">
                                    <input
                                        name="email"
                                        placeholder="email"
                                        type='text'
                                        required
                                        className="border-solid border-[#b55]  drop-shadow-sm border-[1px] w-[75%] h-[44px] rounded-lg px-4" />

                                </div>
                                <div className="pb-8">
                                    <input
                                        name="password"
                                        placeholder="password"
                                        type='password'
                                        required
                                        className="border-solid border-[#b55]  drop-shadow-md border-[1px] w-[75%] h-[44px] rounded-lg px-4" />

                                </div>

                                <div>
                                    <button
                                        className="border-solid border-gray-300 border-[1px] w-[75%] h-[44px] rounded-lg bg-[#b55]  text-white"
                                    >Login</button>
                                </div>
                            </form>
                            <div className="ps-28 pt-3 text-black  ">{error}</div>

                        </div>

                    </div>


                </div>


            </>
        );
    }
}
