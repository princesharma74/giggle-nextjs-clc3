import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
){
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '10', 10);

      // Fetch the rating changes from the database
  try {
    const skip = (page - 1) * size;
    const take = size;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
  
    const users = await prismadb.user.findMany({
        include: {
        submissions: {
            where: {
            submitted_at: {
                gte: startOfDay,
                lte: endOfDay,
            },
            },
        },
        },
        skip,
        take,
    });
users.sort((a, b) => b.submissions.length - a.submissions.length);
    
    const total = await prismadb.user.count({
        where: {
            submissions: {
                some: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            },
        }
    });

    const totalPages = Math.ceil(total / size);

    return NextResponse.json({
        results: users,
        pagination: {
            total,
            page,
            size,
            totalPages,
        }
  });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}