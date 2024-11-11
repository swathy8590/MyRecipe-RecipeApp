import { NextResponse } from "next/server"
import { categoryModel } from "@/app/models/models"
import { dbConnect } from "@/app/libi/db"
import mongoose from "mongoose";


export async function GET(res, rer) {

    await dbConnect()
    // await mongoose.connect('mongodb+srv://swathyrajan674:FKaiSYervNvti0eo@cluster0.ndgkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/recipeDB').then(() => console.log('Connected!'))
    //     .catch(err => console.error('Connection failed:', err));;
    // const categorySchema = mongoose.Schema({
    //     category: String,
    //     description: String,

    // })
    // const categoryModel = mongoose.models.catogaries || mongoose.model("catogaries", categorySchema)
    // //await categoryModel.find(); // Works!
    const getCategory = await categoryModel.find({})
    return NextResponse.json({
        massage: 'hello',
        data: getCategory
    })

}