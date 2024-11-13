"use client"


import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React from 'react'

export const SignUp = ({ setsignup }) => {


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("role", "user");
        const datas = Object.fromEntries(formData.entries());
        console.log(datas);

        try {
            const response = await axios.post("/api/usersignup", datas);
            console.log(response)

            if (response.data.message === true) {
                setsignup(false)
                alert("Successfully signed up!")
            }


        } catch (error) {
            console.error("Error submitting data:", error);
        }

    };


    return (
        <>
            <div className=" bg-black bg-opacity-50 z-50 w-full top-[-60px] h-screen flex items-center fixed my-[60px] ">


                <div className="w-[70%] mx-auto  p-5 bg-white text-left border-solid border-gray-100 rounded-xl h-[70%] drop-shadow-lg  flex gap-5">
                    <div className="w-[50%] h-full  ">
                        <img src={`/asset/loginimage.jpg`} className='w-[100%] h-[100%]' />
                        <div className="bg-red-500 z-40 w-[499px] h-[477px] absolute top-[20px] bg-opacity-40"></div>

                    </div>
                    <button className="absolute right-10" onClick={() => setsignup(false)}><XMarkIcon className="size-6 " /></button>
                    <div className="flex flex-col ps-10 pt-10 w-[50%]">
                        <h1 className=" text-2xl font-semibold mb-8 text-gray-800"> SIGN UP</h1>
                        <form method='post' onSubmit={handleSubmit}>

                            <div className="pb-8 ">
                                <input
                                    name="name"
                                    placeholder="name"
                                    type='text'
                                    required
                                    className="border-solid border-[#b55] drop-shadow-sm border-[1px] w-[75%] h-[44px] rounded-lg px-4" />

                            </div>
                            <div className="pb-8 ">
                                <input
                                    name='email'
                                    placeholder="Email"
                                    type='email'
                                    required
                                    className="border-solid border-[#b55] drop-shadow-sm border-[1px] w-[75%] h-[44px] rounded-lg px-4" />

                            </div>
                            <div className="pb-8">
                                <input
                                    name='password'
                                    placeholder="password"
                                    type='password'
                                    required
                                    className="border-solid border-[#b55] drop-shadow-sm border-[1px] w-[75%] h-[44px] rounded-lg px-4" />

                            </div>

                            <div>
                                <button
                                    className="border-solid border-gray-300 border-[1px] w-[75%] h-[44px] rounded-lg bg-[#b55] text-white"
                                >SignUp</button>
                            </div>
                        </form>

                    </div>
                </div>


            </div>


        </>
    )
}
