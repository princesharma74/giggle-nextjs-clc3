import { User } from "@/types"
import axios from "axios"

const URL = `${process.env.BACKEND_API_URL}/api/user`

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

const getUser = async (userId: string) => {
    try {
        const { data } = await axios.get(`${URL}/${userId}`, { headers })
        const user : User = {
            name: `${data.first_name} ${data.last_name}`,
            username: data.username,
            email: data.email,
            profile: `${process.env.BACKEND_API_URL}${data.avatar}`,
            bio: data.bio,
            leetcode: {
                username: data.leetcode_id, 
                rating: data.leetcode_rating,
                global_ranking: data.leetcode_global_ranking,
                number_of_questions: data.number_of_leetcode_questions,
                number_of_contests: data.number_of_leetcode_contests
            }, 
            codeforces: {
                username: data.codeforces_id, 
                rating: data.codeforces_rating,
                global_ranking: data.codeforces_global_ranking,
                number_of_questions: data.number_of_codeforces_questions,
                number_of_contests: data.number_of_codeforces_contests
            },
            codechef: {
                username: data.codechef_id, 
                rating: data.codechef_rating,
                global_ranking: data.codechef_global_ranking,
                number_of_questions: data.number_of_codechef_questions,
                number_of_contests: data.number_of_codechef_contests
            }
        }
        return user

    } catch (error) {
        console.error(error)
        return null
    }
}

 
export default getUser;