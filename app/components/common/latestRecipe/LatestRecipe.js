"use client"
import ReadMoreArea from '@foxeian/react-read-more'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const LatestRecipe = () => {
    const [recipe, setRecipe] = useState()



    useEffect(() => {
        axios.get("/api/getRecipe").then((response) => setRecipe(response.data.data)
        )
    }, [])



    return (
        <div>
            <div className="bg-[#212631] h-auto border-[1px] border-[#ffffff1a] p-4 ">
                <h1 className="text-xl font-semibold">Recipes</h1>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-100 uppercase bg-[#2B3544] dark:bg-[#111827] dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Recipe Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ingredients
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    categories
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {recipe && recipe.slice(0, 7).map((val, indx) =>

                                <tr key={indx} className="odd:bg-[#1F2937] text-xs  odd:text-[#8A919E] odd:dark:bg-gray-900 even:bg-[#1F2937] even:dark:bg-gray-800 border-b border-[#2D3747] dark:border-[#37415199] even:text-[#8A919E] ">
                                    <th scope="row" className="px-6  font-medium  whitespace-nowrap dark:text-white">
                                        {val.title}
                                    </th>
                                    <td className="px-6">
                                        {Array.isArray(val.ingredients) ?
                                            val.ingredients.map((ingredient, index) => (
                                                <span key={index} className="bg-[#2B3544] text-gray-300  text-[10px] font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                                    {ingredient}
                                                </span>
                                            ))
                                            :

                                            <span className="bg-[#83da26] text-indigo-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-800 dark:text-red-200">

                                                {val.ingredients}
                                            </span>
                                        }</td>

                                    <td className="px-6 ">
                                        {val.categories}
                                    </td>
                                    <td className="px-6">
                                        <img src={`/uploads/${val.files}`} width="50" height="50" />
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>

            </div>



        </div>




        // </div >
    )
}
