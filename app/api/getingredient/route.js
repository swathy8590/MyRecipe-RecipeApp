

import { NextResponse } from "next/server"
import { ingredientsModel } from "@/app/models/models"
import { dbConnect } from "@/app/libi/db"

export async function GET(req, res) {
    await dbConnect();

    const ingredients = await ingredientsModel.find({})

    return NextResponse.json({
        massage: 'hello',
        data: ingredients
    })


}