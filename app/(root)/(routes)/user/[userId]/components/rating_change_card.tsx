import { Badge } from "@/components/ui/badge";
import {format} from "date-fns"
import { RatingChange } from "@/types";

interface RatingChangeCardProps {
    data: RatingChange
}

const RatingChangeCard : React.FC<RatingChangeCardProps> = ({
    data
}) => {
    return ( 
            <div className="flex flex-col w-full p-4 border rounded-md">
                <div className="flex justify-between w-full font-bold">
                    <div className="text-lg font-semibold">{data.contest_title}</div>
                    <div className="text-2xl">
                        {
                            data.rating_change && data.rating_change < 0 ?
                            <span className="text-red-500">
                                {data.rating_change}
                            </span> :
                            <span className="text-green-500">
                                +{data.rating_change}
                            </span>
                        } ({data.final_rating})
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="text-md">Global Rank: {data.rank}</div>
                    <div>
                        <Badge variant={"outline"}>{data.contest.platform}</Badge>
                    </div>
                </div>
                <div className="text-sm">{data.contest.start_time && format(data.contest.start_time, "MMMM do, yyyy")}</div>
            </div>
     );
}
 
export default RatingChangeCard;