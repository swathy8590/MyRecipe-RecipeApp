import { NextResponse } from "next/server";
import { dbConnect } from "@/app/libi/db";
import { reviewModel } from "@/app/models/models";


export async function POST(req, res) {
    try {
        await dbConnect();

        const formData = await req.formData();
        const name = formData.get("name");
        const user_id = formData.get("user_id");
        const recipe_id = formData.get("recipe_id");
        const comment = formData.get("comment");

        const data = {
            name,
            comment,
            recipe_id,
            user_id
        };

        const reviewResult = await reviewModel.insertMany([data]);

        return NextResponse.json({
            success: true,
            data: reviewResult,
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to add review",
        });
    }



}


export async function GET(req, res) {
    await dbConnect();

    const reviewResult = await reviewModel.find()
    return NextResponse.json({
        massage: true,
        data: reviewResult,


    })







}


