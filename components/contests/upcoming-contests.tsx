import { getContests } from "@/actions/get-contests";
import { Separator } from "../ui/separator";
import ContestsList from "./contests-list";

const UpcomingContests = () => {
    const contests = getContests
    return ( 
        <div className="hidden md:flex flex-col w-1/5 gap-3">
            <div className="font-bold">UPCOMING CONTESTS</div>
            <Separator/>
            <ContestsList data={contests}/>
        </div>
     );
}
 
export default UpcomingContests;