
"use client"
import Recipeadd from "@/app/components/common/recipeadd/Recipeadd";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Parser } from 'html-to-react';
import ImageUploading from 'react-images-uploading';
import ReadMoreArea from "@foxeian/react-read-more";
import { RecipeEdit } from "@/app/components/common/recipeEdit/RecipeEdit";

export default function RecipeList() {
    const [add, setadd] = useState(false);
    const [recipes, setRecipes] = useState()
    const [message, setMessage] = useState(true);
    const [editIndex, setEditIndex] = useState(null)
    const [categorie, setCategorie] = useState()
    const [ingredients, setIngredients] = useState()
    const [recipeUpdations, setRecipeUpdations] = useState(false)



    useEffect(() => {

        axios.get("/api/getCategory").then((response) => setCategorie(response.data.data)
        )

    }, [message])

    const addrecipe = () => {
        setadd(true);
    };


    useEffect(() => {
        axios.get("/api/getRecipeAdmin").then((response) => setRecipes(response.data.data)
        )
    }, [message, recipeUpdations])

    useEffect(() => {
        axios.get("/api/getingredient").then((response) => {
            setIngredients(response.data.data)
        }
        )
    }, [message])


    useEffect(() => {
        if (!message) {
            setadd(false);
        }
    }, [message]);


    const deleteRecipe = (id) => {
        if (confirm("are you sure you want to delete this item")) {
            try {
                axios.delete("/api/recipeDelete", {
                    data: { id: id }
                })
                setRecipeUpdations(!recipeUpdations)
                setMessage(true);

                setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
            } catch (error) {
                // console.error("Error deleting recipe:", error);
            }
        }
    }

    const recipeEdit = (index) => {
        setEditIndex(editIndex === index ? null : index)
    }


    const buttonStyle = {
        color: "blue",
        fontSize: "10px",
    };

    function stripHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }




    return (
        <>
            <div className="px-6 mt-4">
                <button
                    className="bg-blue-800 hover:bg-blue-950 text-white px-5 py-2 mb-3 rounded-lg transition"
                    onClick={addrecipe}
                > ADD
                </button>
            </div>

            {add && <Recipeadd setMessage={setMessage} setadd={setadd} />}

            <div className="overflow-x-auto ps-6 mt-4">
                <table className="w-full table-auto bg-[#1F2937]  text-[#a5aab2]  rounded-lg shadow-md ">
                    <thead>
                        <tr className="border-b border-[#2D3747] text-left">
                            <th className="py-3 px-6 border-gray-300">Recipe Name</th>
                            <th className="py-3 px-6 border-gray-300">Ingredients</th>
                            <th className="py-3 px-6 border-gray-300">Instructions</th>
                            <th className="py-3 px-6 border-gray-300">categories</th>
                            <th className="py-3 px-6 border-gray-300">Image</th>
                            <th className="py-3 px-6 border-gray-300">Status</th>
                            <th className="py-3 px-6 border-gray-300">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recipes && recipes.map((value, index) =>

                            <tr className="border-b border-[#2D3747] text-sm" key={index}>
                                <td className="py-3 ps-6 ">{value.title}</td>
                                <td className="py-3 px-6 ">

                                    {Array.isArray(value.ingredients) ? value.ingredients.join(', ') : value.ingredients}
                                </td>
                                <td className="py-3 px-6 border-gray-300 max-w-[30px]">
                                    <ReadMoreArea
                                        className=" text-sm  font-medium "
                                        expandLabel="Read more"
                                        collapseLabel="Read less"
                                        buttonStyle={buttonStyle}
                                        lettersLimit={30}
                                    >
                                        {stripHtml(value.instructions)}
                                    </ReadMoreArea>
                                </td>
                                <td className="py-3 px-6 border-gray-300">{value.categories}</td>
                                <td className="py-3 px-6 border-gray-300"> <Image src={`/uploads/${value.files}`} alt="Recipe Image" width="100" height="100" /></td>
                                <td className={value.recipeStatus === "published" ? "text-green-400" : "text-red-400"}>{value.recipeStatus}</td>
                                <td className="py-3 px-6 border-gray-300 w-[13%]">
                                    <div className="relative group inline-block">
                                        <button className="border-none pe-5" onClick={() => recipeEdit(index)}>
                                            <PencilSquareIcon className="size-5 text-blue-500" />
                                        </button>
                                        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            Edit
                                        </span>
                                    </div>
                                    <RecipeEdit editIndex={editIndex} index={index}
                                        value={value} setEditIndex={setEditIndex} ingredients={ingredients}
                                        categorie={categorie} recipeUpdations={recipeUpdations} setRecipeUpdations={setRecipeUpdations} />

                                    <div className="relative group inline-block">
                                        <button className="border-none" onClick={() => deleteRecipe(value._id)}>
                                            <TrashIcon className="size-5 text-red-500" />
                                        </button>
                                        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            Delete
                                        </span>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}
