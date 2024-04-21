import { Room, Topic } from "@/types"
import axios from "axios"
import { create } from "domain"

const URL = `${process.env.BACKEND_API_URL}/api/rooms`

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

export const getRooms = async () : Promise<Room[]> => {
    try {
        const { data } = await axios.get(URL, { headers })
        const rooms : Room[] = data.map((room: any) => {
            return {
                id: room.id,
                title: room.name,
                description: room.description,
                participants: room.participants,
                createAt: room.created,
                topics: room.topics.map((topic: any) => {
                    return {
                        id: topic.id,
                        name: topic.name
                    }
                }),
            }
        })
        return rooms
    } catch (error) {
        console.error(error)
        return []
    }
}
