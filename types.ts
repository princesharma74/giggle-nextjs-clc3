import { Duration } from "date-fns"

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

export interface RatingChange{
    id: number, 
    contest: Contest,
    rating_change: number, 
    final_rating: number, 
    time_taken: Duration | null, 
    rank: number,
    number_of_problem_solved: number
}

export interface PaginationType{
    count: number,
    num_pages: number,
    has_next: boolean,
    has_previous: boolean,
    page_range: number[]
}

export interface RatingChangePagination extends PaginationType{
    results: RatingChange[]
}
