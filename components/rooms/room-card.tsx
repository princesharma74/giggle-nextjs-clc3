"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Room } from "@/types";
import TimeAgo from "@/components/ui/time-ago";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RoomCardProps{
    data: Room
}

const RoomCard :React.FC<RoomCardProps> = ({
    data
}) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }

    return ( 
        <div>
            <Card onClick={() => {
                router.push(`/room/${data.id}`)
            }}>
                <CardHeader className="">
                    <div className="flex justify-between">
                        <Link href="#">
                            <CardTitle>{data.title}</CardTitle>
                        </Link>
                        <div className="text-xs">
                            <TimeAgo data={data.createdAt}/>
                        </div>
                    </div>
                    <CardDescription>{data.description}</CardDescription>
                    <Separator/>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <Users size={20}/>
                            <div className="text-xs">{data.participants.length} Joined</div>
                            </div>
                        <div className="gap-x-1 flex flex-wrap">
                            {data.topics.map((topic)=>(
                                <div key={topic.name}><Badge>{topic.name}</Badge></div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default RoomCard;