import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { TaskStatusSchema } from "@/lib/validators/taskValidator";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest,{ params }: { params: { taskId: string } } ){
try{
    const session = await getAuthSession();
    if (!session?.user) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 403
        });
    }
    const taskId = parseInt(params.taskId);
    const body = await req.json();
    const { status } = await TaskStatusSchema.parseAsync(body);
    const updatedTask = await db.task.update({
        where: {
          id: taskId,
        },
        data: {
          status,
        },
      });
  
      return NextResponse.json(updatedTask);
}catch(error){
    console.log(error);
    return NextResponse.json({
        message: "something went wrong"
    }, {
        status: 500
    })
}
}