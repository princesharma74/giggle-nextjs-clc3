import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

async function isFollowing(followedByUsername: string, followingUsername: string) {
    const followedByUser = await prismadb.user.findUnique({
        where: {
        username: followedByUsername,
        },
        include: {
        following: true,
        },
    });

    if (!followedByUser) {
        throw new Error(`User with username ${followedByUsername} does not exist`);
    }

    const isFollowing = followedByUser.following.some(user => user.username === followingUsername);

    return isFollowing;
}

export async function POST(req: Request) {
    try {
        const { userId, followId } = await req.json();
        
        // Validate request body
        if (!userId || !followId) {
            return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
        }
        const followed = await isFollowing(userId, followId);
        if(!followed){
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

            return NextResponse.json({ message: 'User followed' });
        }
        else{
            // unfollow the user
            await prismadb.user.update({
                where: { username: userId },
                data: {
                    following: {
                        disconnect: { username: followId },
                    },
                },
            });
            return NextResponse.json({ message: 'User unfollowed' });
        }

    } catch (error) {
        console.error("Error following user:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}