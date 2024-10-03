import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }){
    const { userId } = params;
    try{
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
        const getTasks = await db.task.findMany({
            where: {
              OR: [
                { authorUserId: Number(userId) },
                { assignedUserId: Number(userId) },
              ],
            },
            include: {
              author: true,
              assignee: true,
            },
          });
          return NextResponse.json({
            getTasks
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