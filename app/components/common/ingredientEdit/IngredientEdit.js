"use client"

import axios from 'axios';
import React from 'react'

export const IngredientEdit = ({ value, setEditIndex, setingredient }) => {


    const ingredientUpdate = async (e, id) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            await axios.put("/api/ingredientUpdate", { id, data: updatedData });

            setingredient(prevData => prevData.map(item => item._id === id ? { ...item, ...updatedData } : item));
            setEditIndex(null);
        } catch (error) {
            console.error("Error updating data:", error);
        }


    }
    return (
        <>



            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                <div className="bg-[#1F2937] text-[#e3e4e6] w-full max-w-lg p-8 rounded-2xl shadow-xl text-left">
                    <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
                    <form onSubmit={(e) => ingredientUpdate(e, value._id)}>
                        <div className="mb-4">
                            <label className="block  mb-2">Ingredient </label>
                            <input
                                name="label"
                                defaultValue={value.label}
                                className="w-full  border border-gray-300 bg-[#1F2937] text-[#e3e4e6] rounded-lg p-3"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Description</label>
                            <input
                                name="value"
                                defaultValue={value.value}
                                className="w-full  border border-gray-300 bg-[#1F2937] text-[#e3e4e6] rounded-lg p-3"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="submit"
                                className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-2 rounded-lg transition"
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


        </>
    )
}
