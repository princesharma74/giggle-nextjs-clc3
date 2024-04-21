import { Contest } from "@/types";
import ContestCard from "./contest-card";
import NoResults from "../ui/no-result";
import { Separator } from "../ui/separator";

interface ContestsListProps{
    contests: Contest[]
}
const ContestsList : React.FC<ContestsListProps> = ({
    contests
}) => {
    return ( 
        <div className="hidden md:flex flex-col gap-3 w-48">
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