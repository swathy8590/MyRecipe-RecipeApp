import { NextResponse } from "next/server"
import { categoryModel } from "@/app/models/models"


export async function DELETE(req, res) {
    const { id } = await req.json();
    console.log(id)
    await categoryModel.findByIdAndDelete(id);

    return NextResponse.json({
        message: "hi"
    })

}