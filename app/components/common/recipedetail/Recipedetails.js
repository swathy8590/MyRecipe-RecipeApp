"use client"
import { LatestRecipe } from "../latestRecipe/LatestRecipe";
import { LatestUsers } from "../latestUsers/LatestUsers";
import { RecipeTotal } from "../recipeTotal/RecipeTotal";
import { ReviewTotal } from "../reviewTotal/ReviewTotal";
import TotalUsers from "../totalUsers/TotalUsers";


export default function Recipedetails() {
    return (

        <div className="pe-5 ps-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 py-6 ">
                <RecipeTotal />
                <ReviewTotal />
                <TotalUsers />
            </div >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-white">
                <LatestRecipe />
                <LatestUsers />
            </div>
        </div>

    )
}

