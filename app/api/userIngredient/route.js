import { NextResponse } from "next/server"
import { ingredientsModel } from "@/app/models/models"
import { dbConnect } from "@/app/libi/db"

export async function POST(req, res) {
    await dbConnect()

    const ingredients = await req.json()
    const datas = ingredients[0]

    await ingredientsModel.insertMany([{
        ...datas

    }])

    return NextResponse.json({
        message: true
    })

}