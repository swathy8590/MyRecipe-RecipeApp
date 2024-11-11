import { NextResponse } from "next/server"
import { reviewModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db"
import moment from "moment";

export async function GET(req, res) {
    await dbConnect();

    const reviews = await reviewModel.find({})


    const nameCount = reviews.reduce((res, data) => {




        res[moment(data.createdAt).format('MM-DD-yy')] = (res[moment(data.createdAt).format('MM-DD-yy')] || 0) + 1;
        return res;
    }, {});
    const count = Object.values(nameCount)
    const date = Object.keys(nameCount)

    return NextResponse.json({
        massage: true,
        data: { count: count, date: date }
    })


}