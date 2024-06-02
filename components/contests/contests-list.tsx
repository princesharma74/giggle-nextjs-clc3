/*
"use client"
import { Contest } from "@/types";
import ContestCard from "./contest-card";
import NoResults from "../ui/no-result";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

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
            <div className="font-bold">Upcoming Contests</div>
            <Separator/>
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
*/