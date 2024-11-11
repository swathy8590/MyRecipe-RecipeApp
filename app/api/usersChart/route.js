import { NextResponse } from "next/server"
import { userModel } from "@/app/models/models";
import { dbConnect } from "@/app/libi/db"
import moment from "moment";

export async function GET(req, res) {
    await dbConnect();

    const users = await userModel.find({ role: "user" })

    const nameCount = users.reduce((res, data) => {
        res[moment(data.createdAt).format('MM-DD-yy')] = (res[moment(data.createdAt).format('MM-DD-yy')] || 0) + 1;
        return res;
    }, {});

    const count = Object.values(nameCount)
    const date = Object.keys(nameCount)

    return NextResponse.json({
        massage: 'hello',
        data: { count: count, date: date }
    })


}