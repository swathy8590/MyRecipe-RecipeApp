"use client"

import axios from 'axios';
import React from 'react'

export const CategoryEdit = ({ value, setEditIndex, setCategorie }) => {


    const CategorieUpdate = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            await axios.put("/api/categorieUpdate", { id, data: updatedData });

            setCategorie(prevData => prevData.map(item => item._id === id ? { ...item, ...updatedData } : item));
            setEditIndex(null);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };
    return (
        <>


            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl text-left">
                    <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
                    <form onSubmit={(e) => CategorieUpdate(e, value._id)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Categories </label>
                            <input
                                name="category"
                                defaultValue={value.category}
                                className="w-full border border-gray-300 rounded-lg p-3"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <input
                                name="description"
                                defaultValue={value.description}
                                className="w-full border border-gray-300 rounded-lg p-3"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="submit"
                                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition"
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
