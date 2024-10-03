
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
    const teams = await db.team.findMany();
    
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team) => {
        const [productOwner, projectManager] = await Promise.all([
          db.user.findUnique({
            where: { userId: team.productOwnerUserId! },
            select: { username: true },
          }),
          db.user.findUnique({
            where: { userId: team.projectManagerUserId! },
            select: { username: true },
          })
        ]);

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    return NextResponse.json(teamsWithUsernames);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error retrieving teams: ${error.message}` },
      { status: 500 }
    );
  }
}