"use client"

import { LoginBox } from "@/components/auth/log-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contest } from "@prisma/client";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useLoginModal } from "@/hooks/use-login-modal";
import TimeAgo from "../ui/time-ago";
import { MobileNav } from "../navbar/mobile-nav";

interface HeroSectionProps {
    user: User | null | undefined
    contest: Contest | null
}

const HeroSection : React.FC<HeroSectionProps> = ({
    user, 
    contest
}) => {
    const router = useRouter()
    const loginState = useLoginModal()
    const [loading, setLoading] = useState(false);

    return ( 
        <div className="flex flex-col items-center gap-4 py-16 mx-10">
            <div className="mx-4 flex flex-col items-center">
            <div>
                <Badge variant={"outline"} className="text-center cursor-pointer" onClick={()=>{
                    router.push(`${contest?.url}`)
                }}>
                {`Upcoming Contest ${ contest?.title && contest?.title.length > 25 ? contest.title.slice(0, 25) + '...' : contest?.title} ${contest?.start_time ? formatDistanceToNow(contest.start_time, {addSuffix: true}) : ""}`}
                </Badge>
            </div>
                <div className="font-extrabold text-3xl text-center">Ratings, Submissions & Recent Contests Performance.</div>
                <div className="text-md text-center">Check the stats of codeforces, leetcode and codechef (CLC3) all at once place</div>
            </div>
            <div className="flex gap-2">
                {
                    user ? (
                        <Button disabled={loading} onClick={()=>{
                            setLoading(true);
                            router.push(`/user/${user?.username}`)
                        }} className="rounded-full">
                            View My Profile
                        </Button>
                    ) : (
                        // <LoginBox className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-32"/>
                        <Button
                            className="w-32 rounded-full"
                            onClick={()=>{
                                loginState.onOpen()
                            }}
                        >Login</Button>
                    )
                }
                <Button variant={"outline"} className="rounded-full"
                    onClick={()=>{
                        router.push('/contests')
                    }}
                >Upcoming Contests</Button>
            </div>
        </div>
     );
}
 
export default HeroSection;