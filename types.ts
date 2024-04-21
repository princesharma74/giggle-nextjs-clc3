export interface NavItem{
    href: string, 
    label: string, 
    active: boolean
}

export interface Leetcode{
    username: string, 
    rating: number, 
    global_ranking: number, 
    number_of_questions: number, 
    number_of_contests: number
}

export interface Codeforces{
    username: string, 
    rating: number, 
    global_ranking: number, 
    number_of_questions: number, 
    number_of_contests: number
}

export interface Codechef{
    username: string, 
    rating: number, 
    global_ranking: number, 
    number_of_questions: number, 
    number_of_contests: number
}
export interface User{
    name: string, 
    username: string, 
    email: string,
    profile: string, 
    isAdmin?: boolean, 
    bio?: string, 
    gender?: string, 
    leetcode?: Leetcode, 
    codeforces?: Codeforces, 
    codechef?: Codechef
}

export interface Topic{
    id: number,
    name: string,
    room_count: number
}

export interface Room{
    id: number,
    title: string, 
    description: string,
    participants: User[],
    topics: Topic[],
    host: User
    createAt: Date
}

export interface Contest{
    title: string,
    start_time: Date, 
    url: string, 
    platform: 'Codeforces' | 'Codechef' | 'Leetcode'
}