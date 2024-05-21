import { getRatingChanges } from "@/actions/get-rating-changes";
import RatingChangeCard from "./rating_change_card";
import { RatingChange } from "@/types";
import { RatingChangePagination } from "@/types";
import { useState, useEffect } from "react";
import NoResults from "../ui/no-result";


interface RatingChangeListViewProps{
    data: RatingChangePagination | null
}

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
    const rating_changes = data?.results;
    return ( 
        <div className="flex flex-col w-full gap-2">
            {rating_changes.map((rating_change) => (
                <RatingChangeCard key={rating_change.id} data={rating_change}/>
            ))}
        </div>
     );
}
 
export default RatingChangeListView;