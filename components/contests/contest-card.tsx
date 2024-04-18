import { Separator } from "../ui/separator";
import TimeAgo from "../ui/time-ago";
import { Contest } from "@/types";

interface ContestCardProps{
    data: Contest
}

const ContestCard : React.FC<ContestCardProps> = ({
    data
}) => {
    return ( 
        <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
            <p className="font-medium leading-none">{data.title}</p>
            <div className="flex justify-between">
                <div className="text-sm">{data.platform}</div>
                <div className="text-sm text-muted-foreground text-right">
                    <TimeAgo data={data.time}/>
                </div>
            </div>
            </div>
      </div>
     );
}
 
export default ContestCard;