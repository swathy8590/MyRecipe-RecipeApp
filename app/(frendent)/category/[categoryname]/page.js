
"use client"

import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from "react"

export default function Category({ params }) {
    const [recipes, setRecipes] = useState()


    const { categoryname } = params
    console.log(categoryname);



    useEffect(() => {
        axios.get("/api/getRecipe").then((response) => setRecipes(response.data.data)
        )
    }, [])
    return (
        <>

            <div className='p-4 text-black h-[90vh]' >
                <h2 className='text-3xl font-bold pb-2 ms-5 '>{categoryname} </h2>
                <div className='grid grid-cols-5 scrollbar-hide p-5 gap-10  '>
                    {recipes && recipes.map((value, index) =>
                        value.categories.includes(categoryname) &&

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



        </>
    )
}

