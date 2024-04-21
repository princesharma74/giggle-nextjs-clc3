import { Contest } from "@/types"
import axios from "axios"

const URL = `${process.env.BACKEND_API_URL}/api/contests/upcoming`

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

export const getUpcomingContests = async () : Promise<Contest[]> => {
    try {
        const { data } = await axios.get(URL, { headers })
        const contests : Contest[] = data.map((contest: any) => {
            return {
                title: contest.title,
                url: contest.url,
                start_time: contest.start_time,
                platform: contest.platform
            }
        })
        return contests
    } catch (error) {
        console.error(error)
        return []
    }
}
