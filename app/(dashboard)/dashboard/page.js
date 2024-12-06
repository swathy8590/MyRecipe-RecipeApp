
"use client";
import { useState, useEffect } from 'react';

import Recipedetails from "@/app/components/common/recipedetail/Recipedetails";

export default function Home() {

    return (
        <>

            <div >
                <h2 className="text-2xl font-semibold text-white pb-4 ps-6">
                    All Recipes
                </h2>
                <Recipedetails />
            </div>


        </>
    );
}
