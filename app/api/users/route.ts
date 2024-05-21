import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
){
    // return all users data
    const users = await prismadb.user.findMany();
    return users;
}