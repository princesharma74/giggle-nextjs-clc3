import Link from "next/link";
import { Separator } from "../ui/separator";
import TimeAgo from "../ui/time-ago";
import { Contest } from "@/types";
import { Badge } from "../ui/badge";

interface ContestCardProps{
    contest: Contest
}

const ContestCard : React.FC<ContestCardProps> = ({
    contest
}) => {
    return ( 
        <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
                <Link href={contest.url}><p className="font-medium leading-none">{contest.title}</p></Link>
                <div className="flex justify-between">
                    <div className="text-sm">
                        <TimeAgo data={contest.start_time}/>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                        <Badge variant={"outline"}>{contest.platform}</Badge>
                    </div>
                </div>
            </div>
      </div>
     );
}
 
export default ContestCard;