import { RatingChangePagination } from "@/types"
import axios from "axios"

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

const BASE_URL = `${process.env.BACKEND_API_URL}/api/get-rating-changes`

export const getRatingChanges = async (username : String, page : number, page_size : number) : Promise<RatingChangePagination | null> => {
    try {
        const URL = `${BASE_URL}?filter[username]=${username}&page=${page}&page_size=${page_size}`
        console.log(URL)
        const { data } = await axios.get(URL, { headers })
        const result: RatingChangePagination = data
        return result
    } catch (error) {
        console.error(error)
        return null
    }
}
