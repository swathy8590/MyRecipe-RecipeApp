"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation'
import { PageContext } from '@/app/(frendent)/layout';

export default function AddComment({ recipeId, setGetReview, getReview }) {
    const { data, status } = useSession();
    const [user, setUser] = useState();
    const [userName, setUserName] = useState();
    const router = useRouter()
    const [userComment, setUserComment] = useState(false)

    const loginStatus = useContext(PageContext)
    const setLogin = loginStatus.setLogin

    useEffect(() => {
        axios.get("/api/getuser").then((response) => setUser(response.data.data)
        )
    }, [])



    useEffect(() => {
        status === "unauthenticated" || data === null && router.push("/home")

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

    const userComments = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("user_id", userId);
        formData.append("recipe_id", recipeId);
        formData.append("name", userName);



        try {
            axios.post("../api/review", formData).then((response) => {
                if (response.data.success === true) {
                    setUserComment(true)
                    setGetReview(!getReview)


                    router.push(`../recipes/${recipeId}`)



                }
            }
            );

        } catch (error) {
            console.error("Error submitting data:", error);
        }

    }

    if (userComment) {
        setTimeout(() => {
            setUserComment(false);
        }, 5000);
    }

    // if (status === "authenticated" && data !== null) {
    return (
        <>
            {/* <div className=" bg-black bg-opacity-50 z-70 w-full top-[-60px] left-0 h-screen flex items-center fixed my-[100px]"> */}



            <div className="w-[75%] my-10 mx-auto p-10 bg-white shadow-md relative  text-black">
                {status === "authenticated" && data !== null ? <div>
                    < h1 className="text-2xl font-bold  mb-[33px]   ">Add Your Reviews</h1>
                    <form onSubmit={userComments}>


                        <div className="mb-14">
                            <div className="flex items-center gap-4">

                                <textarea
                                    required
                                    name='comment'
                                    placeholder='add your comment'
                                    className="p-2 border rounded-md border-[#a96363]  w-full "

                                />
                            </div>
                            {userComment && <div className='text-center mt-4'>Comment added successfully.</div>}
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
                </div> : <div>Please <button onClick={() => setLogin(true)} className='text-[#b55]'>Login</button> to add a comment.</div>}
            </div >




            {/* </div> */}


        </>
    )
    // }
}
