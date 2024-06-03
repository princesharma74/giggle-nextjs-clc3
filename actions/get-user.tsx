import prismadb from "@/lib/prismadb";

const getUser = async (emailId: string) => {
    const user = await prismadb.user.findUnique({
        where: {
            email: emailId
        },
        include: {
            codeforces: true,
            codechef: true,
            leetcode: true
        }
    });
    return user;
}

export default getUser;