"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../layout";
import { useSession } from "next-auth/react";
import Footer from "@/app/usercomponents/footer/Footer";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactSearchBox from "react-search-box";

export default function Home() {

    const [recipes, setRecipes] = useState([]);
    const [datas, setDatas] = useState([]);
    const [loginAlert, setLoginAlert] = useState(false);
    const [first, setfirst] = useState()

    const loginStatus = useContext(PageContext);
    const { data, status } = useSession();

    useEffect(() => {
        axios.get("/api/getRecipe").then((response) => {
            const fetchedRecipes = response.data.data || [];
            setRecipes(fetchedRecipes);

            // Map data for ReactSearchBox
            const searchBoxData = fetchedRecipes.map((recipe) => ({
                key: recipe.title,
                value: recipe.title,
            }));
            setDatas(searchBoxData);
        });
    }, []);

    useEffect(() => {
        if (data && status === "authenticated") {
            setLoginAlert(true);
            const timer = setTimeout(() => {
                setLoginAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setLoginAlert(false);
        }
    }, [data, status]);

    const createRecipe = () => {
        if (!data || status === "unauthenticated") {
            loginStatus.setLogin(true);
        }
    };

    console.log(recipes)

    return (
        <>
            <div>
                <div className="bg-gradient-to-r from-white to-red-100 roboto-medium">
                    {loginAlert && (
                        <div className="text-center py-4 lg:px-4">
                            <div
                                className="p-2 bg-gradient-to-r from-red-200 to-red-100 items-center text-gray-800 leading-none lg:rounded-full flex lg:inline-flex"
                                role="alert"
                            >
                                <span className="font-semibold mr-2 text-left flex-auto">
                                    Successfully logged in!
                                </span>
                            </div>
                        </div>
                    )}

                    <ReactSearchBox

                        placeholder="Search Recipes"
                        data={datas}
                        onChange={(value) => setfirst(value)}

                    />

                    {first &&
                        <div className="w-[100%]  grid grid-cols-5 p-5 gap-5 min-h-[100vh] max-h-max absolute  z-10 bg-[#000000ab]">
                            {recipes.map((value, index) => (
                                first !== "" &&
                                value.title.includes(first) &&
                                <div key={index}>
                                    <div className="w-[250px] h-[200px] bg-[#b55] rounded-md">
                                        <Link href={`recipes/${value._id}`}>
                                            <img
                                                src={`/uploads/${value.files}`}
                                                alt={value.title}
                                                width={100}
                                                height={300}
                                                className="w-full h-full rounded-md"
                                            />
                                        </Link>
                                    </div>
                                    <p className="pt-2 font-semibold text-gray-100">{value.title}</p>
                                </div>
                            ))}
                        </div>}
                    <main className="flex justify-between items-center px-40">
                        <div className="max-w-lg">
                            <Image
                                src={`/asset/vagitable.png`}
                                alt="Vegetables"
                                width={800}
                                height={800}
                                className="w-[100px] relative top-[120px] left-[71%]"
                            />
                            <h1 className="text-5xl font-bold text-gray-800">
                                Your Daily Dish
                                <br />
                                <span className="text-[#b55]">A Food Journey</span>
                            </h1>
                            <p className="text-gray-500 mt-4">
                                Discover delicious recipes from around the world and create
                                unforgettable meals at home. Your culinary journey starts here!
                            </p>
                        </div>

                        <div className="w-[400px] rounded-full text-center">
                            <Image
                                src={`/asset/chikken_curry-removebg-preview.png`}
                                alt="Chicken Curry"
                                width={800}
                                height={800}
                                className="w-[100%] mb-10"
                            />
                        </div>
                    </main>
                </div>

                <div className="w-full h-[500px] bg-red-50 flex">
                    <div className="w-3/6 flex items-center justify-center">
                        <img src={`/asset/addrecipe.jpg`} className="w-[250px] h-[250px]" />
                    </div>
                    <div className="w-3/6 flex justify-center flex-col text-gray-800">
                        <h1 className="text-4xl ps-16 font-bold">Share Your Recipes</h1>
                        <p className="text-gray-500 mt-4 text-center w-[60%]">
                            Creating your own recipe on{" "}
                            <span className="font-bold">My</span>
                            <span className="text-red-500 font-bold">Recipe</span> website
                            allows you to share unique dishes, experiment with flavors, and build a
                            community around your culinary creations.
                        </p>
                        <Link href="createrecipe/">
                            <button
                                onClick={createRecipe}
                                className="w-[36%] py-2 mt-4 ms-24 bg-[#b55] text-white rounded-md"
                            >
                                Create New Recipe
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="bg-white w-full h-auto">
                    <h3 className="text-3xl font-bold text-gray-800 px-5 pt-8 text-center">
                        Trending Recipes
                    </h3>
                    <div className="flex overflow-scroll scrollbar-hide p-5 gap-6">
                        {recipes.slice(-10).reverse().map((value, index) => (
                            <div key={index}>
                                <div className="w-[250px] h-[200px] bg-[#b55] rounded-md">
                                    <Link href={`recipes/${value._id}`}>
                                        <img
                                            src={`/uploads/${value.files}`}
                                            alt={value.title}
                                            width={100}
                                            height={300}
                                            className="w-full h-full rounded-md"
                                        />
                                    </Link>
                                </div>
                                <p className="pt-2 font-semibold text-gray-800">{value.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-5 flex justify-center">
                    <div className="text-center">
                        <Link href="allrecipes">
                            <button className="px-12 xl:px-5 flex gap-5 py-2 mt-4 bg-[#b55] text-white rounded-md">
                                View All Recipes
                                <ArrowRightIcon className="size-6" />
                            </button>
                        </Link>
                    </div>
                </div>
                <Footer createRecipe={createRecipe} />
            </div>
        </>
    );
}
