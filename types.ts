import { Prisma } from "@prisma/client"

export interface NavItem{
    href: string, 
    label: string, 
    active: boolean
}

export type Room = Prisma.RoomGetPayload<{
    include: {
        topics: true,
        participants: true
    }
}>

export type User = Prisma.UserGetPayload<{
    include: {
        codeforces: true,
        leetcode: true,
        codechef: true
    }
}>