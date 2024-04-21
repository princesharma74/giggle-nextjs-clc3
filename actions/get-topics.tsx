import { Topic, User } from "@/types"
import axios from "axios"

const URL = `${process.env.BACKEND_API_URL}/api/topics`

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

const getTopics = async () : Promise<Topic[]> => {
    try {
        const { data } = await axios.get(URL, { headers })
        const topics : Topic[] = data.map((topic: any) => {
            return {
                id: topic.id,
                name: topic.name, 
                room_count: topic.room_count
            }
        })
        return topics
    } catch (error) {
        console.error(error)
        return []
    }
}

 
export default getTopics;