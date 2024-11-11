import { NextResponse } from "next/server";
import { recipeModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs"
import { error } from "console";


export async function POST(req) {
    await dbConnect();
    const pump = promisify(pipeline)
    const formdata = await req.formData();

    const file = await formdata.getAll("files")[0]

    const filepath = `./public/uploads/${new Date().getTime()}${file.name}`
    const imagepath = `${new Date().getTime()}${file.name}`


    pump(file.stream(), fs.createWriteStream(filepath))

    const recipeStatus = await formdata.get("recipeStatus")
    const user_id = await formdata.get("user_id")

    const ingredients = await formdata.getAll("ingredients")
    ingredients.pop()
    const categories = await formdata.getAll("categories")
    categories.pop()

    const data = {
        title: formdata.get("title"),
        ingredients: ingredients,
        categories: categories,
        instructions: formdata.get("instructions"),
        files: imagepath,
        recipeStatus: recipeStatus,
        user_id: user_id,


    }

    const finaldata = JSON.stringify(data)

    const resultRecipe = await recipeModel.insertMany([data]).catch(err => err);

    return NextResponse.json({
        message: true, data: resultRecipe
    })
}
