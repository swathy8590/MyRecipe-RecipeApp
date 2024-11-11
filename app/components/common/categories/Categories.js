"use client"

import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

export default function AddCategory({ setMessage, setadd }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const datas = Object.fromEntries(formData.entries());


        try {
            const response = await axios.post("/api/category", datas);


            if (response.data.message === true) {
                setMessage(false);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-40">
            <div className="h-screen flex items-center w-full">
                <div className="p-6 bg-[#1F2937] relative text-[#e3e4e6] rounded-lg shadow-md mx-auto w-[50%]">
                    <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                    <button className="absolute right-5 top-[26px]" onClick={() => setadd(false)}><XMarkIcon className="size-6 " /></button>
                    <form method="post" onSubmit={handleSubmit} className="space-y-6">

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-3">Category Name</label>
                            <input
                                name="category"
                                className="border border-gray-300 bg-[#1F2937] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                                placeholder="Enter category name"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-3 ">Description</label>
                            <textarea
                                name="description"
                                className="border border-gray-300 bg-[#1F2937] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                                placeholder="Enter category description"
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
    );
}
