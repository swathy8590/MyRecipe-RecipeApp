"use client"

import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
export default function Ingredient({ setMessage, setadd }) {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const ingredientData = Object.fromEntries(formData.entries())
        try {
            axios.post("api/ingredient", ingredientData).then((response) => {
                if (response.data.message === true) {
                    setMessage(false)
                }
            }
            );

        } catch (error) {
            console.error("Error submitting data:", error);
        }

    };
    return (
        <>
            <div className="fixed inset-0 flex    justify-center bg-black bg-opacity-50 z-40">
                <div className="  h-screen flex items-center w-full ">
                    <div className="p-6 bg-[#1F2937] text-[#e3e4e6] rounded-lg shadow-md mx-auto w-[50%] relative">
                        <h2 className="text-lg font-semibold mb-4">Add New Ingredient</h2>
                        <button className="absolute right-5 top-[26px]" onClick={() => setadd(false)}><XMarkIcon className="size-6 " /></button>
                        <form method="post" onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 ">
                                    Ingredient Name
                                </label>
                                <input
                                    type="text"
                                    name="value"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-[#1F2937] "
                                    placeholder="Enter ingredient name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 ">
                                    Description
                                </label>
                                <textarea
                                    required
                                    name="label"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-[#1F2937]"
                                    placeholder=" Add Description"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-[20%] bg-blue-800 hover:bg-blue-950 px-4 py-2 rounded-md transition"
                                > Add Ingredient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>





        </>
    )


}
