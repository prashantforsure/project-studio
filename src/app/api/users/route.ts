import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createUserSchema } from "@/lib/validators/userValidator";
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
        const getUsers = await db.user.findMany();
        return NextResponse.json({
            getUsers
        }, {
            status: 200
        })
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
        const { username , cognitoId, profilePictureUrl, teamId } = createUserSchema.parse(body)
        const createUser = await db.user.create({
            data: {
                username,
                cognitoId,
                profilePictureUrl,
                teamId
            }
        })
        return NextResponse.json({
            createUser
        }, {
            status: 200
        })
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message: "something went wrong"
        }, {
            status: 500
        })
    }
}