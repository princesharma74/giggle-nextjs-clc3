import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
  { params }: { params: { emailId: string } }
){
    // return all users data
    const user = await prismadb.user.findUnique({
        include: {
            codeforces: true,
            codechef: true,
            leetcode: true,
        },
        where: {
            email: params.emailId
        }
    });
    return NextResponse.json( user );
}