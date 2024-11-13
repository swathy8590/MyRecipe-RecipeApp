"use client"
import { Select, SelectItem } from '@nextui-org/select';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/creatable';
import { PageContext } from '../layout';
import { ClimbingBoxLoader } from 'react-spinners';


export default function Createrecipe() {
    const { data, status } = useSession();
    const loginStatus = useContext(PageContext);
    const router = useRouter();

    const [instructions, setInstructions] = useState('');
    const [file, setFile] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState([]);
    const [ingredientOption, setIngredientOption] = useState();
    const [ingredientUpdate, setIngredientUpdate] = useState()
    const [category, setCategory] = useState([]);
    const [categoryData, setCategoryData] = useState([])



    useEffect(() => {
        if (data === null
            || status === "unauthenticated") {
            router.push("/home");
            loginStatus.setLogin(true)
        }
    }, [])





    const handleChange = (newValue) => {
        setSelectedIngredient(newValue);
        const filterValue = newValue.filter(val => val.__isNew__)
        filterValue.filter(val => delete val.__isNew__)

        if (filterValue != 0) {
            try {
                axios.post("api/userIngredient", filterValue).then((response) => {
                    if (response.data.message === true) {
                        setIngredientUpdate(!ingredientUpdate)
                    }
                }
                );

            } catch (error) {
                console.error("Error submitting data:", error);
            }
        }

    };

    const selectedIngredientValues = selectedIngredient.map(option => option.value);

    useEffect(() => {
        status === "unauthenticated" || data === null && router.push("/home")

    }, [status, data])

    const userId = data?.user?.email
    useEffect(() => {
        // const fetchCategories = async () => {
        axios.get("/api/getCategory").then((response) => {
            setCategory(response.data.data)
        })
        // };
        // fetchCategories();
    }, []);

    useEffect(() => {
        axios.get("/api/getingredient").then((response) => {
            setIngredientOption(response.data.data)
        }
        )
    }, [ingredientUpdate])

    if (status === "loading") {
        return <div className='flex justify-center'><ClimbingBoxLoader

            color="#ff0202"
            cssOverride={{}}
            loading
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"

        /></div>
    }
    const handleImageUpload = (event) => {
        setFile(event.target.files[0]);

    };

    const userRecipeSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('instructions', instructions);

        if (file) {
            formData.append('files', file);
        }

        formData.append('ingredients', selectedIngredientValues)
        formData.append('categories', categoryData)
        formData.append('recipeStatus', 'draft')
        formData.append('user_id', userId)

        try {
            const response = await axios.post("/api/recipeUpload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            })
            if (response.data.message === true) {

                router.push(`/home`)
            }
        } catch (error) {
            // console.error("Error submitting data:", error);
        }
    }


    if (status === "authenticated" && data !== null) {

        return (
            <>
                <div className="">
                    <div className=' bg-white shadow-md py-5 ps-14 flex items-center mb-6 border border-gray-50 justify-between pe-10'>
                        <h1 className="text-2xl font-bold  ">Create New Recipe</h1>

                    </div>
                    <div className="max-w-[50%] mx-auto p-10 bg-white shadow-md">
                        <form onSubmit={userRecipeSubmit}>
                            <div className="mb-14" >

                                <label className="block mb-2 font-semibold  text-md ">Recipe Title:</label>
                                <input
                                    name='title'
                                    type="text"
                                    className="w-full p-2 border rounded-md border-[#b55]"
                                    placeholder="Enter recipe title"
                                />
                            </div>

                            <div className="mb-14">
                                <label className="block mb-2 font-semibold  text-md">Recipe Image:</label>
                                <div className="flex items-center gap-4">
                                    <div className="relative">

                                    </div>
                                    <input
                                        name='files'
                                        type="file"
                                        onChange={handleImageUpload}
                                        className="p-2 border rounded-md border-[#a96363] text-[#b55] 
                                     file:text-white file:bg-[#000000] file:border-none file:px-2 file:py-1 file:rounded-md file:mx-2 file: my-1 "

                                    />
                                </div>
                            </div>

                            <div className="mb-14">
                                <label className="block mb-2 font-semibold  text-md">Instructions:</label>

                                <ReactQuill theme="snow"
                                    value={instructions} onChange={setInstructions} className='border border-[#b55]' />
                            </div>

                            <div className="mb-14">
                                <label className="block mb-2 font-semibold  text-md">Ingredients:</label>

                                <CreatableSelect
                                    isMulti
                                    name='ingredients'
                                    value={selectedIngredient}
                                    onChange={handleChange}
                                    options={ingredientOption}
                                    placeholder="Type to search or create..."
                                />
                            </div>

                            <div className="mb-7">
                                <label className="block mb-2 font-semibold  text-md">Categories:</label>
                                <Select
                                    name="categories"
                                    isRequired
                                    placeholder="Select categories"
                                    aria-label="categories"
                                    className="rounded-md border-solid border-gray-200 border-[1px] custom-select h-11 w-full pt-1"
                                    selectionMode="multiple"
                                    dropdownPlacement="right"
                                    labelPlacement="outside"
                                    onSelectionChange={(selectedItems) => {
                                        const selectedArrays = Array.from(selectedItems);
                                        setCategoryData(selectedArrays);
                                    }}
                                >
                                    {category.map((value) => (
                                        <SelectItem key={value.category} value={value.description} className="bg-gray-100 p-2">
                                            {value.description}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className='text-end mb-5'>
                                <button
                                    type='submit'
                                    className="bg-[#c15f5f] text-white px-4 py-2 rounded-md mt-2 "
                                >
                                    Upload Recipe
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </>
        )
    }
}

