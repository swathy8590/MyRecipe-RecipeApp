"use client";
import ReadMoreArea from '@foxeian/react-read-more';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const LatestRecipe = () => {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        // Ensure the data fetching happens on the client
        if (typeof window !== 'undefined') {
            axios.get("/api/getRecipe")
                .then(response => {
                    if (response && response.data && response.data.data) {
                        setRecipe(response.data.data);
                    }
                })
                .catch(error => console.error("Error fetching recipe data:", error));
        }
    }, []);

    return (
        <div className="bg-[#212631] h-auto border-[1px] border-[#ffffff1a] p-4">
            <h1 className="text-xl font-semibold">Recipes</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-100 uppercase bg-[#2B3544] dark:bg-[#111827] dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Recipe Name</th>
                            <th scope="col" className="px-6 py-3">Ingredients</th>
                            <th scope="col" className="px-6 py-3">Categories</th>
                            <th scope="col" className="px-6 py-3">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe.slice(0, 7).map((val, indx) => (
                            <tr
                                key={indx}
                                className="odd:bg-[#1F2937] text-xs odd:text-[#8A919E] even:bg-[#1F2937] even:text-[#8A919E] border-b border-[#2D3747]"
                            >
                                <th scope="row" className="px-6 font-medium whitespace-nowrap text-white">{val.title}</th>
                                <td className="px-6">
                                    {Array.isArray(val.ingredients)
                                        ? val.ingredients.map((ingredient, index) => (
                                            <span key={index} className="bg-[#2B3544] text-gray-300 text-[10px] font-medium mr-2 px-2.5 py-0.5 rounded">
                                                {ingredient}
                                            </span>
                                        ))
                                        : <span className="bg-[#83da26] text-indigo-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                            {val.ingredients}
                                        </span>
                                    }
                                </td>
                                <td className="px-6">{val.categories}</td>
                                <td className="px-6">
                                    <img src={`/uploads/${val.files}`} alt={val.title} width="50" height="50" className="rounded" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
