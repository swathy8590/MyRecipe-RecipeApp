
"use client"

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { PageContext } from '../layout';
import { useSession } from 'next-auth/react';
import Footer from '@/app/usercomponents/footer/Footer';
import { ArrowLeftStartOnRectangleIcon, ArrowRightIcon, ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


export default function Home() {
    const [recipes, setRecipes] = useState()
    const [loginAlert, setLoginAlert] = useState(false)


    const loginStatus = useContext(PageContext);
    const { data, status } = useSession();


    useEffect(() => {
        axios.get("/api/getRecipe").then((response) => setRecipes(response.data.data)
        )
    }, [])

    useEffect(() => {
        if (data !== null && status === "authenticated") {
            setLoginAlert(true)
        }
    }, [status, data])

    if (loginAlert) {
        setTimeout(() => {
            setLoginAlert(false);
        }, 5000);
    }

    useEffect(() => {

        if (data === null || status === "unauthenticated") {
            setLoginAlert(false)
        }
    }, [status, data])


    const createRecipe = () => {
        if (data === null
            || status === "unauthenticated") {
            loginStatus.setLogin(true)
        }
    }



    return (
        <>
            <div>
                <div className=" bg-gradient-to-r from-white to-red-100 roboto-medium">

                    {loginAlert && <div class=" text-center py-4 lg:px-4">
                        <div class="p-2 bg-gradient-to-r from-red-200 to-red-100 items-center text-black leading-none lg:rounded-full flex lg:inline-flex" role="alert">

                            <span class="font-semibold mr-2 text-left flex-auto">successfully logged !</span>
                            {/* <button type="button" class="ms-auto -mx-1.5 -my-1.5  text-black rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close"

                                onClick={closefn}>
                                <XMarkIcon />

                            </button> */}
                        </div>
                    </div>}

                    <main className="flex justify-between items-center px-40 ">
                        <div className="max-w-lg">
                            <Image src={`/asset/vagitable.png`}
                                alt="Noodles"
                                width={800}
                                height={800}
                                className="w-[100px] mb-10 absolute top-[24%] left-[33%]" />
                            <h1 className="text-5xl font-bold text-gray-800">
                                Your Daily Dish
                                <br />
                                <span className="text-red-500">A Food Journey</span>
                            </h1>
                            <p className="text-gray-500 mt-4">
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                Maecenas vitae enim pharetra,
                                venenatis nunc eget, finibus est.
                            </p>
                        </div>

                        <div className=" w-[400px] rounded-full  text-center">
                            <Image
                                src={`/asset/chikken_curry-removebg-preview.png`}
                                alt="Noodles"
                                width={800}
                                height={800}
                                className="w-[100%] mb-10"
                            />
                        </div>
                    </main>
                </div>

                <div className='w-full h-[500px] bg-red-50 flex ' >

                    <div className='w-3/6 flex  items-center justify-center'>
                        <img src={`/asset/addrecipe.jpg`} className='w-[250px] h-[250px]' />

                    </div>
                    <div className='w-3/6 flex justify-center flex-col   '>
                        <h1 className="text-4xl ps-16  font-bold">Share Your Recipes</h1>
                        <p className="text-gray-500 mt-4 text-center w-[60%]">
                            Creating your own recipe on a
                            <span className=" font-bold"> My</span><span className="text-red-500 font-bold">Recipe </span>
                            website allows you to share unique dishes,
                            experiment with flavors, and build a community around your culinary creations.
                        </p>
                        <Link href={"createrecipe/"}>
                            <button onClick={createRecipe} className=" w-[36%]  py-2 mt-4 ms-24
                             bg-[#b55]  text-white rounded-md "  >
                                Create New Recipe</button>
                        </Link>
                    </div>
                </div>

                <div className='bg-white w-full h-auto'>
                    <h3 className="text-3xl font-bold text-gray-800 p-5 text-center">
                        Trending Recipes
                    </h3>
                    <div className='flex overflow-scroll scrollbar-hide p-5 gap-6  '>
                        {recipes && recipes.slice(0, 12).map((value, index) =>
                            <div key={index} className=''>
                                <div className='w-[250px] h-[200px] bg-[#b55] rounded-md'>
                                    <Link href={`recipes/${value._id}`} >
                                        <img
                                            src={`/uploads/${value.files}`}
                                            alt="Noodles"
                                            width={100}
                                            height={300}
                                            className='w-full h-full rounded-md' /></Link>
                                </div>
                                <p className='pt-2 font-semibold '>{value.title}</p>
                            </div>)}
                    </div>
                </div>
                <div>
                    <div className='my-12 flex justify-center'>
                        <div className='w-[18%]'>
                            <Link href={"allrecipes"}>
                                <button className=" px-12 flex gap-5 py-2 mt-4  bg-[#b55] text-white rounded-md " >
                                    View All Recipes<ArrowRightIcon className='size-6' /></button>
                            </Link></div>
                    </div>
                    <Footer createRecipe={createRecipe} />
                </div>
            </div >
        </>
    );
}