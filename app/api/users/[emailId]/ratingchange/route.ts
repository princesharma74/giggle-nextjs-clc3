import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { emailId: string } }
){
    const { emailId } = params;
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '10', 10);

      // Fetch the rating changes from the database
  try {
    const skip = (page - 1) * size;
    const take = size;
    const ratingChanges = await prismadb.ratingChange.findMany({
        where: {
            user_email: emailId
        },
        include: {
            contest: true
        },
        orderBy: {
            contest: {
                start_time: 'desc'
            }
        },
        skip,
        take
    });

    const total = await prismadb.ratingChange.count({
        where: {
            user_email: emailId
        }
    });

    const totalPages = Math.ceil(total / size);

    return NextResponse.json({
        results: ratingChanges,
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