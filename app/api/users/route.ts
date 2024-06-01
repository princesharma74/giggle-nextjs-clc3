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