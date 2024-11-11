
"use client"

import Ingredient from "@/app/components/common/ingredient/Ingredients";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { IngredientEdit } from "@/app/components/common/ingredientEdit/IngredientEdit";

export default function Ingredients() {
    const [add, setadd] = useState(false)
    const [ingredient, setingredient] = useState()
    const [message, setMessage] = useState(true);
    const [editIndex, setEditIndex] = useState(null)


    const addingredients = () => {
        setadd(true)
    }
    useEffect(() => {
        axios.get("/api/getingredient").then((response) => {
            setingredient(response.data.data)
        }
        )
    }, [message])
    useEffect(() => {
        if (!message) {
            setadd(false);
        }
    }, [message]);

    const ingredientDelete = async (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const res = await axios.delete("/api/ingredientDelete", {
                    data: { id: id }
                });

                setMessage(prev => !prev);
            } catch (error) {
                // console.error("Error deleting ingredient:", error);
            }
        }
    };

    const ingredientEdit = (index) => {
        setEditIndex(editIndex === index ? null : index)

    }

    return (
        <>


            {add && <Ingredient setMessage={setMessage} setadd={setadd} />}

            <div className="overflow-x-auto ps-6  mt-4">

                <button className="bg-blue-800 hover:bg-blue-950  text-white px-5 py-2 mb-3 rounded-lg transition"
                    onClick={addingredients}>ADD</button>

                <table className="w-full table-auto bg-[#1F2937]  text-[#a5aab2] rounded-lg shadow-md  mt-4 ">
                    <thead>
                        <tr className="border-b border-[#2D3747]">
                            <th className="py-3 px-6 ">Ingredients </th>
                            <th className="py-3 px-6 ">Description</th>
                            <th className="py-3 px-6 ">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ingredient && ingredient.map((value, index) => {
                            return (
                                <tr key={index} className="text-center border-b border-[#2D3747]">
                                    <td className="py-3 px-6 ">{value.value}</td>
                                    <td className="py-3 px-6 ">{value.label}</td>
                                    <td className="py-3 px-6 ">
                                        <div className="relative group inline-block">
                                            <button className="border-none pe-5" onClick={() => ingredientEdit(index)}  >
                                                <PencilSquareIcon className="size-5 text-blue-500" />
                                            </button>
                                            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Edit
                                            </span>
                                        </div>

                                        {editIndex === index && (
                                            <IngredientEdit value={value} setEditIndex={setEditIndex} setingredient={setingredient} />
                                        )}


                                        <div className="relative group inline-block">
                                            <button className="border-none" onClick={() => ingredientDelete(value._id)}>
                                                <TrashIcon className="size-5 text-red-500" />
                                            </button>
                                            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Delete
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )


}