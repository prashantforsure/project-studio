import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
        const getTasks = await db.task.findMany();
        return NextResponse.json({
            getTasks
        }, {
            status: 200
        }
    )
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message: "something went wrong"
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextRequest){
    try{
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
        const body = await req.json();
        const { title, description, start}
    }
}