
import { NextResponse } from "next/server";
import { recipeModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db";
import fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';

export async function PUT(req) {
    try {
        await dbConnect();

        const formdata = await req.formData();
        const id = formdata.get("id");
        const pump = promisify(pipeline)
        //const formdata = await req.formData();
        const file = await formdata.getAll("files")[0]
        const filepath = `./public/uploads/${new Date().getTime()}${file.name}`
        const imagepath = `${new Date().getTime()}${file.name}`

        pump(file.stream(), fs.createWriteStream(filepath))
        const ingredients = formdata.getAll("ingredients");
        const title = formdata.get("title");
        const categories = formdata.getAll("categories");
        const instructions = formdata.get("instructions");
        const recipeStatus = formdata.get('recipeStatus')

        const data = {
            title,
            ingredients: ingredients,
            categories: categories,
            instructions,
            files: imagepath,
            recipeStatus: recipeStatus,
        };
        const result = await recipeModel.findByIdAndUpdate(id, data, { new: true });

        return NextResponse.json({ message: 'Document updated successfully', data: result });
    } catch (error) {
        console.error("Error updating document:", error);
        return NextResponse.json({ message: 'Error updating document', error }, { status: 500 });
    }
}
