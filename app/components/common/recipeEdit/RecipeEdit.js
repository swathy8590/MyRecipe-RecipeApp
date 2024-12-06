
"use client"

import { Select, SelectItem } from '@nextui-org/select';
import axios from 'axios';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';


const ReactQuill = dynamic(
    () => {
        return import('react-quill');
    },
    { ssr: false }
);


export const RecipeEdit = ({ editIndex, index, value, setEditIndex, categorie, ingredients, setRecipeUpdations, recipeUpdations }) => {

    const [IngredientData, setIngredientData] = useState()
    const [file, setFile] = useState(null);
    const [instructions, setInstructions] = useState(value.instructions);
    const [categoryData, setCategoryData] = useState("");
    const [recipeStatus, setRecipeStatus] = useState();


    const handleImageUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const recipeUpdate = async (e, id) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("id", id);

        if (file) {
            formData.append("files", file);
        }
        formData.append('instructions', instructions);
        formData.append('categories', categoryData);
        formData.append('recipeStatus', recipeStatus);


        try {
            const response = await axios.put(`/api/recipeUpdate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditIndex(null);
            setRecipeUpdations(!recipeUpdations)
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };



    return (
        <>

            {editIndex === index && (
                <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-40">
                    <div className="h-auto flex w-full overflow-scroll">
                        <div className="w-[50%] px-20 relative pt-5 h-auto bg-[#1F2937] text-[#e3e4e6] mx-auto my-auto text-left border-solid border-gray-100 rounded-lg pb-5">
                            <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>

                            <form onSubmit={(e) => recipeUpdate(e, value._id)} method="post">
                                <div className="mb-4">
                                    <label className="block  mb-2">Recipe Name </label>
                                    <input
                                        name="title"
                                        defaultValue={value.title}
                                        className="w-full border border-gray-300 rounded-lg p-3 bg-[#1F2937]"
                                        required
                                    />
                                </div>


                                <div className="relative mt-5">
                                    <label className="block  mb-2">Ingredients</label>
                                    <Select
                                        name="ingredients"
                                        isRequired
                                        placeholder="Select ingredients"
                                        aria-label="ingredients"
                                        className="rounded-md border-solid border-gray-200 border-[1px] custom-select h-11 w-full pt-1"
                                        selectionMode="multiple"
                                        dropdownPlacement="right"
                                        labelPlacement="outside"
                                        defaultSelectedKeys={value.ingredients}
                                        onSelectionChange={(selectedItems) => {
                                            const selectedArray = Array.from(selectedItems);
                                            setIngredientData(selectedArray);
                                        }}
                                    >
                                        {ingredients.map((ingredient) => (
                                            <SelectItem key={ingredient.label} className="bg-gray-100 p-2">
                                                {ingredient?.value}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="relative mt-5">
                                    <label className="block  mb-2">Categories</label>
                                    <Select
                                        name="categories"
                                        isRequired
                                        placeholder="Select categories"
                                        aria-label="categories"
                                        className="rounded-md border-solid border-gray-200 border-[1px] custom-select h-11 w-full pt-1"
                                        selectionMode="multiple"
                                        dropdownPlacement="right"
                                        labelPlacement="outside"
                                        defaultSelectedKeys={value.categories}
                                        onSelectionChange={(selectedItems) => {
                                            const selectedArrays = Array.from(selectedItems);
                                            setCategoryData(selectedArrays);
                                        }}
                                    >
                                        {categorie.map((values) => (
                                            <SelectItem key={values.category}
                                                className="bg-gray-100 p-2">
                                                {values.category}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>


                                <div className="mb-4 mt-5">
                                    <label className="block  mb-2">Instructions</label>
                                    <ReactQuill theme="snow" defaultValue={value.instructions}
                                        onChange={setInstructions} />
                                </div>



                                <div className="flex flex-col mt-5">
                                    <label className="block  mb-2">File</label>
                                    <input
                                        name="files"
                                        type="file"
                                        onChange={handleImageUpload}
                                        className="border border-gray-300 bg-[#1F2937] text-[#e3e4e6] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:hover:bg-blue-950 file:text-white file:cursor-pointer"
                                        required
                                    />
                                </div>
                                <div className="relative mt-2 ">

                                    <span className='text-blue-700 text-lg font-medium'> File Name:</span>{value.files}
                                </div>

                                <div className="relative inline-block mt-2">
                                    <select
                                        name="recipeStatus"
                                        defaultValue={value.recipeStatus}
                                        onChange={(e) => setRecipeStatus(e.target.value)}
                                        className="block w-36 p-2 text-[#e3e4e6] bg-blue-800 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={value.recipeStatus} >{value.recipeStatus} </option>
                                        {value.recipeStatus === 'published' ? (
                                            <option value="draft" className='bg-blue-800'>draft</option>
                                        ) : (
                                            <option value="published">published</option>
                                        )}
                                    </select>
                                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                        ▼
                                    </span>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="submit"
                                        className="bg-blue-800 hover:bg-blue-950 text-white py-2 px-6 rounded-lg shadow-lg transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditIndex(null)}
                                        className="bg-red-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}
