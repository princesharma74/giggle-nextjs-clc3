import RatingChangeCard from "./rating_change_card";
import { useState, useEffect } from "react";
import NoResults from "../ui/no-result";
import { RatingChange } from "@/types";

interface RatingChangeListViewProps{
    data: RatingChange[] | null }

const RatingChangeListView : React.FC<RatingChangeListViewProps> = async ({
    data
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }

    if(!data){
        return <NoResults message="No contest performance found."/>
    }
    return ( 
        <div className="flex flex-col w-full gap-2">
            {data.map((rating_change) => (
                <RatingChangeCard key={rating_change.contest_title} data={rating_change}/>
            ))}
        </div>
     );
}
 
export default RatingChangeListView;