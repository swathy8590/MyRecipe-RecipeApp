import { NextResponse } from "next/server"
import { categoryModel } from "@/app/models/models"



export async function PUT(req, res) {

    const { id, data } = await req.json();

    const result = await categoryModel.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ message: 'Document updated successfully', data: result });

}