import { NextResponse } from "next/server"
import { recipeModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db"

export async function GET(req, res) {
    await dbConnect();

    const recipes = await recipeModel.find({ recipeStatus: "published" })

    return NextResponse.json({
        massage: 'hello',
        data: recipes
    })


}