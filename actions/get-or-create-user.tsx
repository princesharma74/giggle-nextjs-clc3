import prismadb from "@/lib/prismadb"
import { randomUUID } from "crypto"
import { User } from "@/types"

const getOrCreateUser = async (first_name: string | null | undefined, emailId : string, profile: string | null | undefined) : Promise<User> => {
    const user = await prismadb.user.upsert({
        where: {
            email: emailId
        },
        update: {},
        create: {
            first_name: first_name,
            email: emailId,
            username: randomUUID(),
            avatar: profile
        }, 
        include: {
            codeforces: true,
            codechef: true,
            leetcode: true
        }
    })
    return user

}

export default getOrCreateUser;