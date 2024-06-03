import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import TimeAgo from "@/components/ui/time-ago";
import { Badge } from "@/components/ui/badge";
import { Contest } from "@prisma/client";
import { format } from "date-fns";

interface ContestCardProps{
    contest: Contest
}

const ContestCard : React.FC<ContestCardProps> = ({
    contest
}) => {
    return ( 
        <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
                <Link href={contest.url ? contest.url : "#"}><p className="font-medium leading-none">{contest.title}</p></Link>
                <div className="flex justify-between">
                    <div className="text-sm">
                        {contest.start_time ? format(contest.start_time, 'MMMM do, yyyy hh:mm a') : ""}
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