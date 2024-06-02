import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
){
    // return all users data
    const users = await prismadb.user.findMany({
        include: {
            codeforces: true,
            codechef: true,
            leetcode: true,
        }
    });
    return NextResponse.json( users );
}
export async function POST(req: Request) {
    try {
        const { userId, followId } = await req.json();
        
        // Validate request body
        if (!userId || !followId) {
            return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
        }

        // Follow the user
        await prismadb.user.update({
            where: { username: userId },
            data: {
                following: {
                    connect: { username: followId },
                },
            },
        });

        // Update followedBy for the user being followed
        await prismadb.user.update({
            where: { username: followId },
            data: {
                followedBy: {
                    connect: { username: userId },
                },
            },
        });

        return NextResponse.json({ message: 'User followed successfully' });
    } catch (error) {
        console.error("Error following user:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}