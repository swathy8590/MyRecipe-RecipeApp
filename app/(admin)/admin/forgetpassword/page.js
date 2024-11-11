"use client"

import Otpphonenumber from "@/app/components/common/otpphone/Otpphonenumber";
import Link from "next/link";


export default function Home() {
    return (
        <>

            <Otpphonenumber />
            <div className="bg-gray-200 w-full h-screen flex items-center">


                <div className="w-[70%] mx-auto  p-5 bg-white text-left border-solid border-gray-100 rounded-xl h-[70%] drop-shadow-lg  flex gap-5">
                    <div className="w-[50%] h-full bg-green-100"></div>
                    <div className="flex flex-col ps-10 pt-16 w-[50%]">
                        <h1 className=" text-2xl font-semibold  text-gray-800 ps-20">Enter Verification OTP</h1>
                        <p className="text-center  w-[80%] text-md">We have sent a code in your number This code will expire in 02:00 s</p>
                        <form>
                            <div className="pb-8 ">
                                <input
                                    required
                                    placeholder="OTP"
                                    className="border-double border-b-black border-white  border-[1px] w-[75%] h-[44px] rounded-lg ps-4"
                                />
                            </div>


                            <div>
                                <Link href="/resetpassword">  <button
                                    className="border-solid border-gray-300 border-[1px] w-[75%] h-[44px] rounded-lg bg-green-600 text-white"
                                >Validate OTP</button></Link>

                            </div>
                            <div className="pt-4">
                                <button
                                    className="border-solid border-green-600 border-[1px] w-[75%] h-[44px] rounded-lg text-green-400"
                                >Resend Code in 1.30 s</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </>
    )
}