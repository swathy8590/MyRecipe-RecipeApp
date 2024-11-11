import { NextResponse } from "next/server"
import { userModel } from "@/app/models/models"
import { dbConnect } from "@/app/libi/db"

export async function GET(req, res) {
    await dbConnect();

    const users = await userModel.find({})

    return NextResponse.json({
        massage: 'hello',
        data: users
    })


}