import { NextResponse } from "next/server"
import { recipeModel } from "@/app/models/models"


export async function DELETE(req, res) {
    const { id } = await req.json();

    await recipeModel.findByIdAndDelete(id);

    return NextResponse.json({
        message: true
    })

}