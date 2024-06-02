/*
import { RatingChange } from "@/types";
import { Badge } from "../ui/badge";

interface RatingChangeCardProps {
    data: RatingChange
}

const RatingChangeCard : React.FC<RatingChangeCardProps> = ({
    data
}) => {
    return ( 
            <div className="flex flex-col w-full p-4 border rounded-md">
                <div className="flex justify-between w-full font-bold">
                    <div className="text-lg">{data.contest.title}</div>
                    <div className="text-2xl">
                        {
                            data.rating_change < 0 ?
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
                    <div className="text-lg">Global Rank: {data.rank}</div>
                    <div>
                        <Badge>{data.contest.platform}</Badge>
                    </div>
                </div>
            </div>
     );
}
 
export default RatingChangeCard;
*/