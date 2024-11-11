"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function AddComment({ recipeId, setUserComment, setGetReview, getReview }) {
    const { data, status } = useSession();
    const [user, setUser] = useState();
    const [userName, setUserName] = useState();

    useEffect(() => {
        axios.get("/api/getuser").then((response) => setUser(response.data.data)
        )
    }, [])



    useEffect(() => {
        status === "unauthenticated" || data?.user?.role !== "user" || data === null && router.push("/landingpage")

    }, [status, data])
    const userId = data?.user?.email


    useEffect(() => {

        if (userId && user) {
            const matchedUser = user.find((val) => val.email === userId);
            if (matchedUser) {
                setUserName(matchedUser.name);
            }
        }
    }, [user, userId]);



    console.log(userName)






    const userComments = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("user_id", userId);
        formData.append("recipe_id", recipeId);
        formData.append("name", userName);

        // comment: String,
        // name: String,
        // user_id: String,
        // recipe_id: String,


        try {
            axios.post("api/review", formData).then((response) => {
                if (response.data.success === true) {
                    setUserComment(false)
                    setGetReview(!getReview)


                }
            }
            );

        } catch (error) {
            console.error("Error submitting data:", error);
        }

    }

    if (status === "authenticated" && data.user.role === "user" && data !== null) {
        return (
            <>
                <div className=" bg-black bg-opacity-50 z-70 w-full top-[-60px] left-0 h-screen flex items-center fixed my-[100px]">



                    <div className="w-[50%] mx-auto p-10 bg-white shadow-md relative">
                        <h1 className="text-2xl font-bold  mb-[33px]  ">Add Your Reviews</h1>
                        <button className="absolute right-10 top-[40px]"
                            onClick={() => setUserComment(false)}><XMarkIcon className="size-6 " /></button>
                        <form onSubmit={userComments}>


                            <div className="mb-14">
                                {/* <label className="block mb-2 font-semibold  text-md">COMMENT</label> */}
                                <div className="flex items-center gap-4">

                                    <textarea
                                        name='comment'
                                        placeholder='add your comment'
                                        className="p-2 border rounded-md border-[#a96363]  w-full "

                                    />
                                </div>
                            </div>

                            <div className='text-end mb-5'>
                                <button
                                    type='submit'
                                    className="bg-[#c15f5f] text-white px-4 py-2 rounded-md mt-2 "
                                >
                                    Upload comment
                                </button>
                            </div>

                        </form>
                    </div>




                </div>


            </>
        )
    }
}
