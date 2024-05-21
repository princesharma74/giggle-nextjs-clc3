import { User } from "@/types"
import axios from "axios"

const URL = `${process.env.BACKEND_API_URL}/api/user`

const headers = {
    Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`
}

const getUser = async (userId: string) : Promise<User | null> => {
    try {
        const { data } = await axios.get(`${URL}/${userId}`, { headers })
        const user : User = {
            name: `${data.first_name} ${data.last_name}`,
            username: data.username,
            email: data.email,
            profile: `${process.env.BACKEND_API_URL}${data.avatar}`,
            bio: data.bio,
            leetcode: {
                username: data.leetcode.user_id, 
                rating: data.leetcode.rating,
                global_ranking: data.leetcode.global_ranking,
                number_of_questions: data.leetcode.number_of_questions,
                number_of_contests: data.leetcode.number_of_contests
            }, 
            codeforces: {
                username: data.codeforces.user_id,
                rating: data.codeforces.rating,
                global_ranking: data.codeforces.global_ranking,
                number_of_questions: data.codeforces.number_of_questions,
                number_of_contests: data.codeforces.number_of_contests
            },
            codechef: {
                username: data.codechef.user_id,
                rating: data.codechef.rating,
                global_ranking: data.codechef.global_ranking,
                number_of_questions: data.codechef.number_of_questions,
                number_of_contests: data.codechef.number_of_contests
            }
        }
        return user

    } catch (error) {
        console.error(error)
        return null
    }
}

 
export default getUser;