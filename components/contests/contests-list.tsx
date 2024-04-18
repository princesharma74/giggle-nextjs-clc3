import { Contest } from "@/types";
import ContestCard from "./contest-card";
import NoResults from "../ui/no-result";

interface ContestsListProps{
    data: Contest[]
}
const ContestsList : React.FC<ContestsListProps> = ({
    data
}) => {
    return ( 
        <div className="flex flex-col gap-y-1">
            {data ? data.map((contest) => (
                <div key={contest.link}>
                    <ContestCard data={contest} />
                </div>
            )) : <NoResults message={"No Results"} />}
        </div>
     );
}
 
export default ContestsList;