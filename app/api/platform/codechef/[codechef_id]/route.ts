import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { codechef_id: string } }
){
    try{
        const { email, uuid } = await req.json();
        const response = await axios.get(`https://www.codechef.com/users/${params.codechef_id}`);
        const html = response.data;
        const isVerified = html.includes(uuid);
        try{
            await prismadb.codechef.update({
                where: { user_email: email },
                data: { verified: isVerified }
            });
            return NextResponse.json({ title : isVerified ? "Verification Successful" : "Verification Failed", description: isVerified ? "Codechef user ID verified" : "Make sure you have added the verification code to your Codechef profile"});
        }
        catch(err : any) {
            return new NextResponse(JSON.stringify({ title: "Verification Failed", description: err.message }), { status: 500 });
        } 
    }
    catch(err : any) {
        return new NextResponse(JSON.stringify({ title: "Verification Failed", description: err.message }), { status: 500 });
    }
}