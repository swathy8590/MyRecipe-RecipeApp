
import { NextResponse } from "next/server"
import { ingredientsModel } from "@/app/models/models"


export async function DELETE(req, res) {
    const { id } = await req.json();

    await ingredientsModel.findByIdAndDelete(id);

    return NextResponse.json({
        message: "hi"
    })

}