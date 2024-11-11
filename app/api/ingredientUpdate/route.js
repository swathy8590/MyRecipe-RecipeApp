import { NextResponse } from "next/server"
import { ingredientsModel } from "@/app/models/models"



export async function PUT(req, res) {

    const { id, data } = await req.json();

    const result = await ingredientsModel.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ message: 'Document updated successfully', data: result });

}