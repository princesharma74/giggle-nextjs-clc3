import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
){
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '10', 10);

    try {
        const skip = (page - 1) * size;
        const take = size;

        // Fetch the users from the database with pagination
        const users = await prismadb.user.findMany({
            include: {
                codeforces: true,
                codechef: true,
                leetcode: true,
            },
            orderBy: {
                lastUpdatedAt : 'asc'
            },
            skip,
            take
        });

        const total = await prismadb.user.count();
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
