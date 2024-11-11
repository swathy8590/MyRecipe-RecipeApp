import { NextResponse } from "next/server";
import { categoryModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db";



export async function POST(req, res) {
    await dbConnect();

    const data = await req.json()
    await categoryModel.insertMany([{
        ...data
    }])

    return NextResponse.json({
        message: true
    })


}
