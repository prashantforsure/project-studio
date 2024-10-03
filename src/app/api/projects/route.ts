import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createProjectSchema } from "@/lib/validators/projectValidator";

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
        const getTasks = await db.project.findMany();
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
        const { name, description, startDate, endDate} = createProjectSchema.parse(body)
        const createProject = await db.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        })
        return NextResponse.json({createProject},
            {
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