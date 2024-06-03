"use client"
import ContestCard from "./contest-card";
import NoResults from "@/components/ui/no-result";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Contest } from "@prisma/client";
import Heading from "@/components/ui/heading";

interface ContestsListProps{
    contests: Contest[]
}
const ContestsList : React.FC<ContestsListProps> = ({
    contests
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }
    return ( 
        <div className="flex flex-col gap-3">
            <Heading
                title="Upcoming Contests"
                description="Top 10 recent upcoming contests"
            />
            <div className="flex flex-col gap-y-1">
                {contests ? contests.map((contest) => (
                    <div key={contest.url}>
                        <ContestCard contest={contest} />
                    </div>
                )) : <NoResults message={"No Results"} />}
            </div>
        </div>
     );
}
 
export default ContestsList;