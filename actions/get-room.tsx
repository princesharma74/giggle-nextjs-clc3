import { Room, Topic } from "@/types"
import axios from "axios"
import { create } from "domain"

const URL = `${process.env.BACKEND_API_URL}/api/room`

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

export const getRoom = async ( id: number ) : Promise<Room | null> => {
    try {
        const url = `${URL}/${id}`
        const { data } = await axios.get(url, { headers })
        const room : Room = {
            id: data.id,
            topics: data.topics.map((topic: any) => {
                return {
                    id: topic.id,
                    name: topic.name
                }
            }),
            participants: data.participants,
            title: data.name,
            description: data.description,
            host: data.host,
            createAt: data.created,
        }
        return room
    } catch (error) {
        console.error(error)
        return null
    }
}
