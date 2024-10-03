import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,  { params }: { params: { cognitoId: string } }){
    const { cognitoId } = params
    try{
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
        const getUser = await db.user.findUnique({
            where: {
                cognitoId
            }
        })
        return NextResponse.json({
            getUser
        }, {
            status: 200
        })
    } catch(error){
        console.log(error);
        return NextResponse.json({
            message: "something went wrong"
        }, {
            status: 500
        })
    }
}