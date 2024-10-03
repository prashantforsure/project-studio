import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { query: string } } ){
    const { query } = params;
    try{
        const session = await getAuthSession();
        if (!session?.user) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 403
        });
        }

    }
}