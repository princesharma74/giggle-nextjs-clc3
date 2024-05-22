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