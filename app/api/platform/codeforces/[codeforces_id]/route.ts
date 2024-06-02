import axios from "axios";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { codeforces_id: string } }
){
    try{
        const { email, uuid } = await req.json();
        const response = await axios.get(`https://codeforces.com/profile/${params.codeforces_id}`);
        const html = response.data;
        console.log(html);
        const isVerified = html.includes(uuid);
        try{
            await prismadb.codeforces.update({
                where: { user_email: email },
                data: { verified: isVerified }
            });
            return NextResponse.json({ title : isVerified ? "Verification Successful" : "Verification Failed", description: isVerified ? "Codeforces user ID verified" : "Make sure you have added the verification code to your Codeforces profile"});
        }
        catch(err : any) {
            return new NextResponse(JSON.stringify({ title: "Verification Failed", description: err.message }), { status: 500 });
        } 
    }
    catch(err : any) {
        return new NextResponse(JSON.stringify({ title: "Verification Failed", description: err.message }), { status: 500 });
    }
}