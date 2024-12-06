"use client";

import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploading from 'react-images-uploading';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import dynamic from 'next/dynamic';


const ReactQuill = dynamic(
    () => {
        return import('react-quill');
    },
    { ssr: false }
);

export function RecipeAdd({ setMessage, setadd }) {
    const [category, setCategory] = useState([]);
    const [IngredientData, setIngredientData] = useState([]);
    const [file, setFile] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [images, setImages] = useState([]);
    const [categoryData, setCategoryData] = useState([])

    const { data, status } = useSession();
    const adminId = data.user.email

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get("/api/getCategory");
            setCategory(response.data.data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios.get("/api/getingredient");
            setIngredients(response.data.data);
        };
        fetchIngredients();
    }, []);

    const recipeList = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        formData.append('ingredients', IngredientData);
        formData.append('instructions', instructions);
        formData.append('categories', categoryData)
        formData.append('recipeStatus', 'published')
        formData.append('user_id', adminId)

        if (file) {
            formData.append('files', file);
        }

        try {
            const response = await axios.post("/api/recipeUpload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.message === true) {
                setMessage(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleImageUpload = (event) => {
        setFile(event.target.files[0]);
    };
    return (
        <>
            <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-40">
                <div className="h-auto flex w-full overflow-scroll">
                    <div className="w-[50%] px-20 relative pt-5 h-[650px] bg-[#1F2937] text-[#e3e4e6] mx-auto my-auto text-left border-solid border-gray-100 rounded-lg pb-5">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-100">Add Recipes</h1>
                        <button className="absolute right-5 top-[26px]" onClick={() => setadd(false)}><XMarkIcon className="size-6 " /></button>
                        <form method="post" onSubmit={recipeList} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-2">Recipe Name</label>
                                <input
                                    name="title"
                                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-[#1F2937] text-[#e3e4e6]"
                                    placeholder="Add recipe name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2">Ingredients</label>
                                <Select
                                    name="ingredients"
                                    isRequired
                                    placeholder="Select ingredients"
                                    aria-label="ingredients"
                                    className="rounded-md border-solid border-gray-200 border-[1px] custom-select h-11 w-full pt-1 "
                                    selectionMode="multiple"
                                    dropdownPlacement="right"
                                    labelPlacement="outside"
                                    onSelectionChange={(selectedItems) => {
                                        const selectedArray = Array.from(selectedItems);
                                        setIngredientData(selectedArray)
                                    }}
                                >
                                    {ingredients.map((ingredient) => (
                                        <SelectItem key={ingredient.label} value={ingredient.value} className="bg-[#3c4d64] text-gray-100 p-2">
                                            {ingredient?.value}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="relative">
                                <label className="mb-3">Categories</label>
                                <Select
                                    name="categories"
                                    isRequired
                                    selectionMode="multiple"
                                    placeholder="Select categories"
                                    aria-label="categories"
                                    className="rounded-md border-solid border-gray-200 border-[1px] custom-select h-11 w-full pt-1"
                                    dropdownPlacement="right"
                                    labelPlacement="outside"
                                    onSelectionChange={(selectedItems) => {
                                        const selectedArrays = Array.from(selectedItems);
                                        setCategoryData(selectedArrays);
                                    }}
                                >
                                    {category.map((value) => (
                                        <SelectItem key={value.category} value={value.description} className="bg-[#3c4d64] text-gray-100  p-2">
                                            {value.description}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-2">Instructions</label>
                                <ReactQuill theme="snow" value={instructions} onChange={setInstructions} />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2">File</label>
                                <input
                                    name="files"
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="border border-gray-300 bg-[#1F2937] text-[#e3e4e6] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:hover:bg-blue-950 file:text-white file:cursor-pointer"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-800 hover:bg-blue-950 text-white py-2 px-6 rounded-lg shadow-lg transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
