import { NextResponse } from "next/server"
import { ingredientsModel } from "@/app/models/models"
import { dbConnect } from "@/app/libi/db"

export async function POST(req, res) {
    await dbConnect()

    const ingredients = await req.json()

    await ingredientsModel.insertMany([{
        ...ingredients

    }])

    return NextResponse.json({
        message: true
    })

}