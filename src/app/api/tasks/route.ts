import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { TaskSchema } from "@/lib/validators/taskValidator";
import { NextRequest, NextResponse } from "next/server";

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
        const {
            title,
            description,
            status,
            priority,
            tags,
            startDate,
            dueDate,
            points,
            projectId,
            authorUserId,
            assignedUserId,
          } = TaskSchema.parse(body);
          

        const createTask = await db.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        })
        return NextResponse.json({
            createTask
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

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }){
    const { projectId } = params;
    try{
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
        const getTask = await db.task.findFirst({
            where: {
                projectId: Number(projectId)
            }
        })
        return NextResponse.json({
            getTask
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