import { NextResponse } from "next/server";
import { userModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db";
import bcrypt from "bcrypt";



export async function POST(req, res) {
    await dbConnect();
    console.log(req)
    const data = await req.json()

    console.log(data.email, data.name, data.password, data.role)
    const email = await data.email;

    const emailFound = await userModel.findOne({ email })
    if (emailFound) {
        return NextResponse.json({
            message: "Email already exists"
        })

    }
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const datas = await userModel.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role
    })

    return NextResponse.json({
        message: true
    })


}