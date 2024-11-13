"use client"

import AddCategory from "@/app/components/common/categories/Categories";
import { CategoryEdit } from "@/app/components/common/categoryEdit/CategoryEdit";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Catogaries() {
    const [add, setadd] = useState(false)
    const [categorie, setCategorie] = useState()
    const [message, setMessage] = useState(true);
    const [editIndex, setEditIndex] = useState(null)


    const addcatogary = () => {

        setadd(true)
    }
    useEffect(() => {
        axios.get("/api/getCategory").then((response) => setCategorie(response.data.data)
        )
    }, [message])

    useEffect(() => {
        if (!message) {
            setadd(false);
        }
    }, [message]);


    const categoryDelete = async (id) => {


        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const res = await axios.delete("/api/categorieDelete", {
                    data: { id: id }
                });
                setMessage(prev => !prev);
            } catch (error) {
                console.error("Error deleting ingredient:", error);
            }
        }
    };
    const categorieEdit = (index) => {
        setEditIndex(editIndex === index ? null : index)
    }
    return (
        <>

            {add && <AddCategory setMessage={setMessage} setadd={setadd} />}
            <div className="overflow-x-auto ps-6  mt-4">
                <button className="bg-blue-800 hover:bg-blue-950 text-white px-5 py-2 mb-3 rounded-lg transition"
                    onClick={addcatogary}>ADD</button>


                <table className="w-full table-auto bg-[#1F2937]  text-[#a5aab2] rounded-lg shadow-md  mt-4 ">
                    <thead>
                        <tr className="border-b border-[#2D3747]">
                            <th className="py-3 px-6 ">Categories</th>
                            <th className="py-3 px-6 ">Description</th>
                            <th className="py-3 px-6 ">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorie && categorie.map((value, index) => {
                            return (<tr className="text-center border-b border-[#2D3747]" key={index}>
                                <td className="py-3 px-6 ">{value.category}</td>
                                <td className="py-3 px-6 ">{value.description}</td>
                                <td className="py-3 px-6 ">
                                    <div className="relative group inline-block">
                                        <button className="border-none pe-5" onClick={() => categorieEdit(index)}>
                                            <PencilSquareIcon className="size-5 text-blue-500" />
                                        </button>
                                        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            Edit
                                        </span>
                                    </div>
                                    {editIndex === index && <CategoryEdit value={value} setEditIndex={setEditIndex} setCategorie={setCategorie} />}

                                    <div className="relative group inline-block">
                                        <button className="border-none">
                                            <TrashIcon className="size-5 text-red-500" onClick={() => categoryDelete(value._id)} />
                                        </button>
                                        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            Delete
                                        </span>
                                    </div>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )

}