
"use client"

import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { Parser } from 'html-to-react';
import { useSession } from "next-auth/react";

import Link from "next/link";
import AddComment from "@/app/usercomponents/addComment/Addcomment";
import { PageContext } from "../layout";

export default function Recipes({ params }) {
    const [review, setReview] = useState()
    const [recipes, setRecipes] = useState()
    const [userComment, setUserComment] = useState(false)
    const [getReview, setGetReview] = useState()
    const htmlParser = new Parser();
    const { data, status } = useSession();
    const loginStatus = useContext(PageContext);

    useEffect(() => {
        axios.get("/api/getRecipe").then((response) => setRecipes(response.data.data)
        )
    }, [])

    useEffect(() => {
        axios.get("/api/review").then((response) => setReview(response.data.data)
        )
    }, [getReview])

    const addComment = () => {
        if (data?.user?.role !== "user" || data === null
            || status === "unauthenticated") {
            loginStatus.setLogin(true)
        } else {
            setUserComment(true)

        }
    }
    const { recipename } = params
    return (
        <>


            {recipes && recipes.map((value, index) =>
                value.title === recipename &&

                <div key={index} className='pe-5 py-1 '>
                    <div className="pt-20 ">

                        <div className="mx-auto w-[75%]  drop-shadow-lg bg-zinc-50 p-10 rounded-lg border-[1px] border-gray-200 ">
                            <h1 className="text-3xl font-bold text-center pb-8 ">{value.title}</h1>
                            <div className=" flex">

                                <div className=' flex flex-col rounded-md px-4 w-[40%]  '>
                                    <img
                                        src={`/uploads/${value.files}`}
                                        alt="Noodles"
                                        width={100}
                                        height={300}
                                        className='w-[350px] h-[300px] rounded-md' />

                                    <div className=' pt-3 '>
                                        <span className=" font-semibold  text-lg" >Categorie:</span>{value.categories}
                                    </div>
                                    <div className='pt-2'>
                                        <span className=" font-semibold  text-lg">Ingredients:</span>{value.ingredients.join(', ')}
                                    </div>

                                </div>

                                <div className="ms-3 w-[50%]" >
                                    <ul>
                                        <li className=' text-md '><span className=" font-semibold  text-lg">Instructions:</span>{htmlParser.parse(value.instructions)}</li>
                                    </ul>
                                    <div className="text-right">

                                        <button onClick={addComment} className="mt-4 px-3 py-2 bg-[#b55] text-white rounded-md ">add review</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {userComment && <AddComment recipeId={value._id} setUserComment={setUserComment} setGetReview={setGetReview} getReview={getReview} />}


                        <div className="mx-auto w-[75%] mt-10 bg-gradient-to-br from-zinc-100 to-white p-10 rounded-lg shadow-lg h-auto ">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-800 pb-6 border-b-2 border-gray-200">
                                    Reviews
                                </h1>
                            </div>
                            <div className=" ">
                                {review &&
                                    review.map(
                                        (rval, indx) =>
                                            rval.recipe_id === value._id && (
                                                <div
                                                    key={indx}
                                                    className="mt-8 bg-white shadow-md rounded-xl p-6 w-[90%]  transition-all hover:scale-105"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-[50px] h-[50px] bg-[#b55] rounded-full flex-shrink-0 mr-4 shadow-md"></div>
                                                        <p className="text-lg font-semibold text-gray-700">
                                                            {rval.name}
                                                        </p>
                                                    </div>
                                                    <p className="text-xl mt-4 text-gray-600 italic pl-4 border-l-4 border-gray-300">
                                                        "{rval.comment}"
                                                    </p>
                                                </div>
                                            )
                                    )}
                            </div>
                        </div>

                    </div>
                </div >
            )
            }
        </>

    )
}